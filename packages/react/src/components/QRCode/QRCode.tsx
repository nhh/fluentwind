import { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { QRCodeProps } from './QRCode.types';

// ── Minimal QR Code encoder (byte mode, versions 1-10) ──────────────────────

const EC_LEVELS: Record<string, number> = { L: 1, M: 0, Q: 3, H: 2 };

// [total codewords, ec codewords per block, numBlocks] per version (1-10) per level (L,M,Q,H)
const EC_TABLE: Record<number, Record<string, [number, number, number]>> = {
  1:  { L: [26,7,1],   M: [26,10,1],  Q: [26,13,1],  H: [26,17,1]  },
  2:  { L: [44,10,1],  M: [44,16,1],  Q: [44,22,1],  H: [44,28,1]  },
  3:  { L: [70,15,1],  M: [70,26,1],  Q: [70,18,2],  H: [70,22,2]  },
  4:  { L: [100,20,1], M: [100,18,2], Q: [100,26,2], H: [100,16,4] },
  5:  { L: [134,26,1], M: [134,24,2], Q: [134,18,4], H: [134,22,4] },
  6:  { L: [172,18,2], M: [172,16,4], Q: [172,24,4], H: [172,28,4] },
  7:  { L: [196,20,2], M: [196,18,4], Q: [196,18,6], H: [196,26,5] },
  8:  { L: [242,24,2], M: [242,22,4], Q: [242,22,6], H: [242,26,6] },
  9:  { L: [292,30,2], M: [292,22,5], Q: [292,20,8], H: [292,24,8] },
  10: { L: [346,18,4], M: [346,26,5], Q: [346,24,8], H: [346,28,8] },
};

// Data capacity in bytes for byte mode per version/level
const BYTE_CAPACITY: Record<number, Record<string, number>> = {};
for (let v = 1; v <= 10; v++) {
  BYTE_CAPACITY[v] = {};
  for (const l of ['L', 'M', 'Q', 'H']) {
    const [total, ecPerBlock, numBlocks] = EC_TABLE[v][l];
    BYTE_CAPACITY[v][l] = total - ecPerBlock * numBlocks;
  }
}

const VERSION_SIZE = (v: number) => 17 + v * 4;

// Alignment pattern center positions per version
const ALIGNMENT_POSITIONS: Record<number, number[]> = {
  2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 52],
};

function getVersion(dataLen: number, level: string): number {
  for (let v = 1; v <= 10; v++) {
    // mode indicator (4) + char count indicator (8 for v1-9, 16 for v10+ but we use 8 for simplicity up to v9)
    const overhead = v <= 9 ? 2 : 2; // bytes for mode + count header
    if (BYTE_CAPACITY[v][level] - overhead >= dataLen) return v;
  }
  return 10; // cap at version 10
}

// GF(256) arithmetic for Reed-Solomon
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x << 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGenPoly(nsym: number): Uint8Array {
  let g = new Uint8Array([1]);
  for (let i = 0; i < nsym; i++) {
    const ng = new Uint8Array(g.length + 1);
    const factor = GF_EXP[i];
    for (let j = 0; j < g.length; j++) {
      ng[j] ^= g[j];
      ng[j + 1] ^= gfMul(g[j], factor);
    }
    g = ng;
  }
  return g;
}

function rsEncode(data: Uint8Array, nsym: number): Uint8Array {
  const gen = rsGenPoly(nsym);
  const res = new Uint8Array(data.length + nsym);
  res.set(data);
  for (let i = 0; i < data.length; i++) {
    const coef = res[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        res[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return res.slice(data.length);
}

function encodeData(text: string, level: string): { bits: number[]; version: number } {
  const data = new TextEncoder().encode(text);
  const version = getVersion(data.length, level);
  const [totalCW, ecPerBlock, numBlocks] = EC_TABLE[version][level];
  const dataCW = totalCW - ecPerBlock * numBlocks;

  // Build data bitstream: mode indicator (0100 = byte) + char count + data
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  pushBits(0b0100, 4); // byte mode
  const ccBits = version <= 9 ? 8 : 16;
  pushBits(data.length, ccBits);
  for (const b of data) pushBits(b, 8);

  // Terminator
  const capacity = dataCW * 8;
  const termLen = Math.min(4, capacity - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const pads = [0xec, 0x11];
  let pi = 0;
  while (bits.length < capacity) {
    pushBits(pads[pi % 2], 8);
    pi++;
  }

  // Convert to codeword array
  const codewords = new Uint8Array(dataCW);
  for (let i = 0; i < dataCW; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) byte = (byte << 1) | (bits[i * 8 + b] || 0);
    codewords[i] = byte;
  }

  // Split into blocks and compute EC
  const blockDataSize = Math.floor(dataCW / numBlocks);
  const extraBlocks = dataCW % numBlocks;
  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  let offset = 0;

  for (let b = 0; b < numBlocks; b++) {
    const bSize = blockDataSize + (b >= numBlocks - extraBlocks && extraBlocks > 0 ? 1 : 0);
    const block = codewords.slice(offset, offset + bSize);
    dataBlocks.push(block);
    ecBlocks.push(rsEncode(block, ecPerBlock));
    offset += bSize;
  }

  // Interleave data codewords
  const finalBits: number[] = [];
  const pushCW = (cw: number) => {
    for (let b = 7; b >= 0; b--) finalBits.push((cw >> b) & 1);
  };

  const maxDataLen = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of dataBlocks) {
      if (i < block.length) pushCW(block[i]);
    }
  }

  // Interleave EC codewords
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of ecBlocks) {
      if (i < block.length) pushCW(block[i]);
    }
  }

  return { bits: finalBits, version };
}

// Format info bits
const FORMAT_INFO: Record<string, number[]> = {};
{
  // Pre-computed format info (mask pattern 0-7 x level)
  const formatPoly = 0x537;
  for (const [levelName, levelBits] of Object.entries(EC_LEVELS)) {
    for (let mask = 0; mask < 8; mask++) {
      let data = (levelBits << 3) | mask;
      let remainder = data << 10;
      for (let i = 14; i >= 10; i--) {
        if (remainder & (1 << i)) remainder ^= formatPoly << (i - 10);
      }
      const info = ((data << 10) | remainder) ^ 0x5412;
      const bits: number[] = [];
      for (let i = 14; i >= 0; i--) bits.push((info >> i) & 1);
      FORMAT_INFO[`${levelName}_${mask}`] = bits;
    }
  }
}

function createMatrix(version: number): { matrix: number[][]; reserved: boolean[][] } {
  const size = VERSION_SIZE(version);
  const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder patterns
  const placeFinderPattern = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const mr = row + r;
        const mc = col + c;
        if (mr < 0 || mr >= size || mc < 0 || mc >= size) continue;
        reserved[mr][mc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[mr][mc] = 1;
          }
        }
      }
    }
  };

  placeFinderPattern(0, 0);
  placeFinderPattern(0, size - 7);
  placeFinderPattern(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    reserved[6][i] = true;
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    reserved[i][6] = true;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Alignment patterns
  if (version >= 2) {
    const positions = ALIGNMENT_POSITIONS[version];
    for (const r of positions) {
      for (const c of positions) {
        // Skip if overlaps with finder
        if (r <= 8 && c <= 8) continue;
        if (r <= 8 && c >= size - 8) continue;
        if (r >= size - 8 && c <= 8) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            reserved[r + dr][c + dc] = true;
            matrix[r + dr][c + dc] =
              Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0) ? 1 : 0;
          }
        }
      }
    }
  }

  // Dark module
  reserved[size - 8][8] = true;
  matrix[size - 8][8] = 1;

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    reserved[8][i] = true;
    reserved[8][size - 1 - i] = true;
    reserved[i][8] = true;
    reserved[size - 1 - i][8] = true;
  }
  reserved[8][8] = true;

  return { matrix, reserved };
}

function placeData(
  matrix: number[][],
  reserved: boolean[][],
  bits: number[],
): void {
  const size = matrix.length;
  let bitIdx = 0;
  let upward = true;

  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5; // skip timing column
    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (const dc of [0, -1]) {
        const c = col + dc;
        if (c < 0 || reserved[row][c]) continue;
        matrix[row][c] = bitIdx < bits.length ? bits[bitIdx++] : 0;
      }
    }
    upward = !upward;
  }
}

function applyMask(matrix: number[][], reserved: boolean[][], maskId: number): number[][] {
  const size = matrix.length;
  const result = matrix.map((row) => [...row]);
  const maskFn = [
    (r: number, c: number) => (r + c) % 2 === 0,
    (r: number, _c: number) => r % 2 === 0,
    (_r: number, c: number) => c % 3 === 0,
    (r: number, c: number) => (r + c) % 3 === 0,
    (r: number, c: number) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r: number, c: number) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r: number, c: number) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (r: number, c: number) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
  ][maskId];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && maskFn(r, c)) {
        result[r][c] ^= 1;
      }
    }
  }
  return result;
}

function placeFormatInfo(matrix: number[][], level: string, maskId: number): void {
  const size = matrix.length;
  const bits = FORMAT_INFO[`${level}_${maskId}`];

  // Around top-left finder
  for (let i = 0; i <= 5; i++) matrix[8][i] = bits[i];
  matrix[8][7] = bits[6];
  matrix[8][8] = bits[7];
  matrix[7][8] = bits[8];
  for (let i = 9; i <= 14; i++) matrix[14 - i][8] = bits[i];

  // Around other finders
  for (let i = 0; i <= 7; i++) matrix[size - 1 - i][8] = bits[i];
  for (let i = 8; i <= 14; i++) matrix[8][size - 15 + i] = bits[i];
}

function penaltyScore(matrix: number[][]): number {
  const size = matrix.length;
  let score = 0;

  // Penalty 1: consecutive same-color modules in row/col
  for (let r = 0; r < size; r++) {
    let count = 1;
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        count++;
        if (count === 5) score += 3;
        else if (count > 5) score += 1;
      } else {
        count = 1;
      }
    }
  }
  for (let c = 0; c < size; c++) {
    let count = 1;
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        count++;
        if (count === 5) score += 3;
        else if (count > 5) score += 1;
      } else {
        count = 1;
      }
    }
  }

  // Simplified penalty: just use penalty 1 for speed
  return score;
}

function generateQR(text: string, level: string): number[][] {
  if (!text) return [];

  const { bits, version } = encodeData(text, level);
  const { matrix, reserved } = createMatrix(version);
  placeData(matrix, reserved, bits);

  // Try all 8 masks, pick best
  let bestMask = 0;
  let bestScore = Infinity;

  for (let m = 0; m < 8; m++) {
    const masked = applyMask(matrix, reserved, m);
    placeFormatInfo(masked, level, m);
    const s = penaltyScore(masked);
    if (s < bestScore) {
      bestScore = s;
      bestMask = m;
    }
  }

  const result = applyMask(matrix, reserved, bestMask);
  placeFormatInfo(result, level, bestMask);
  return result;
}

// ── React Component ──────────────────────────────────────────────────────────

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value,
      size = 128,
      level = 'M',
      bgColor = 'white',
      fgColor = 'black',
      includeMargin = true,
      className,
      ...props
    },
    ref,
  ) => {
    const modules = useMemo(() => generateQR(value, level), [value, level]);

    if (modules.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center rounded-medium bg-neutral-background-1 border border-neutral-stroke-2',
            className,
          )}
          style={{ width: size, height: size }}
          {...props}
        />
      );
    }

    const moduleCount = modules.length;
    const margin = includeMargin ? 4 : 0;
    const viewBox = moduleCount + margin * 2;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-medium bg-neutral-background-1 border border-neutral-stroke-2',
          className,
        )}
        style={{ width: size, height: size, padding: includeMargin ? 4 : 0 }}
        {...props}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
        >
          <rect x="0" y="0" width={viewBox} height={viewBox} fill={bgColor} />
          {modules.map((row, r) =>
            row.map((cell, c) =>
              cell ? (
                <rect
                  key={`${r}-${c}`}
                  x={c + margin}
                  y={r + margin}
                  width={1}
                  height={1}
                  fill={fgColor}
                />
              ) : null,
            ),
          )}
        </svg>
      </div>
    );
  },
);

QRCode.displayName = 'QRCode';
