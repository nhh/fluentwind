# FluentWind Visual-Polish & Theme-Consistency Audit

This directory holds a systematic audit of FluentWind's ~80 components across its 5 themes (web-light, web-dark, teams-light, teams-dark, high-contrast). It is documentation only — no component code was changed as part of producing this audit.

## Files

- **`visual-polish-2026-04.json`** — canonical source of truth. Array of findings, each `{component, theme, check, severity, note, evidencePath}`. Filter/aggregate this file to build any derived view.
- **`FINDINGS.md`** — human-readable, grouped by component. Scan this to understand the state of any one component.
- **`BACKLOG.md`** — flat list sorted by severity. Use this to prioritize fix work.

## Methodology

Three-pass, snapshot-led review per component.

### Pass 1 — Snapshot comparison

Source of evidence: `apps/playground/e2e/visual/component-screenshots.spec.ts-snapshots/<Component>-<theme>-chromium-win32.png` (deterministic Playwright baselines, 1% pixel tolerance, animations disabled).

For each component, compare the 5 theme PNGs side-by-side against the 12-item checklist.

### Pass 2 — Playground spot-check

Only for components flagged in pass 1. `pnpm --filter playground dev`, visit `#ComponentName`, toggle themes via the FluentWindProvider switcher. Captures interactive states (hover / active / focus-visible / disabled / transitions) not present in snapshots.

### Pass 3 — Source grep

Batch-scan `packages/react/src/components/` for:

- Hex literals: `#[0-9a-fA-F]{3,8}`
- Bare color words in class strings: `bg-white`, `text-black`, `bg-gray-*`, `bg-zinc-*`, `bg-neutral-*` (without the `fw-` token prefix)
- Arbitrary Tailwind values: `\[.*\]` inside class strings
- Non-token shadows: `shadow-[...]`
- `tailwind-merge` collision risks: same utility family applied twice via `cn(...)`

## 12-item polish checklist

Each finding targets one of these checks:

| # | Check | Short code |
|---|---|---|
| 1 | Typography from token classes (no `text-[13px]`) | `typography-tokens` |
| 2 | Spacing on 4px grid, token-derived | `spacing-grid` |
| 3 | Border radii from token set | `radius-tokens` |
| 4 | Shadows use elevation tokens | `shadow-tokens` |
| 5 | Hover / active / disabled distinct in all 5 themes | `state-distinctness` |
| 6 | Focus ring: consistent offset, width, token color | `focus-ring` |
| 7 | Icon alignment & size vs. label | `icon-alignment` |
| 8 | Color tokens only — no hex, no bare `gray-*` | `color-tokens` |
| 9 | Dark mode: surfaces not washed, text readable | `dark-mode` |
| 10 | High-contrast: borders visible, selection legible | `high-contrast` |
| 11 | Motion uses duration/easing tokens, respects `prefers-reduced-motion` | `motion-tokens` |
| 12 | Density / compact variants preserve alignment & target | `density` |

## Severity rubric

- **critical** — broken in ≥1 theme (invisible element, unreadable text, WCAG AA text-contrast fail). Blocks release.
- **major** — visibly wrong but usable (wrong token, cross-theme inconsistency, missing focus ring).
- **minor** — small drift (px-level spacing, slight radius/shadow mismatch, icon misalignment).
- **polish** — optical nice-to-haves (motion smoothing, subtle optical tweaks).

## How to reproduce / extend this audit

1. Regenerate any stale baselines: `pnpm --filter playground exec playwright test visual --update-snapshots`.
2. Iterate the component list from `apps/playground/e2e/helpers/components.ts` (`ALL_COMPONENTS`) — this is the canonical order, and it maps 1:1 to snapshot filenames.
3. For each component, open `<Component>-web-light-*.png`, `-web-dark-*.png`, `-teams-light-*.png`, `-teams-dark-*.png`, `-high-contrast-*.png` side-by-side.
4. Record any failed check into `visual-polish-2026-04.json` with the canonical short code (`color-tokens`, `high-contrast`, …) and a severity.
5. Re-generate `FINDINGS.md` / `BACKLOG.md` from the JSON.

## Verification of this audit

- **Coverage**: every name in `ALL_COMPONENTS` appears at least once in `visual-polish-2026-04.json`. Components with zero findings are recorded with a single `{check: "_pass", severity: "polish"}` entry so their presence is explicit.
- **Evidence traceability**: every finding's `evidencePath` points to a real PNG under `apps/playground/e2e/visual/component-screenshots.spec.ts-snapshots/`.
- **Reproducibility**: a second pass through a random 5-component sample should reproduce severity ratings within ±1 level.
