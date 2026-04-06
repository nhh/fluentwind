import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { cn } from '../../utils/cn';
import type { SplitterProps, SplitterPanelProps, SplitterResizeHandleProps } from './Splitter.types';

// --- Context ---

interface SplitterContextValue {
  orientation: 'horizontal' | 'vertical';
  panelSizes: number[];
  setPanelSizes: React.Dispatch<React.SetStateAction<number[]>>;
  panelConstraints: { minSize: number; maxSize: number }[];
  registerPanel: (index: number, constraints: { minSize: number; maxSize: number }) => void;
}

const SplitterContext = createContext<SplitterContextValue>({
  orientation: 'horizontal',
  panelSizes: [],
  setPanelSizes: () => {},
  panelConstraints: [],
  registerPanel: () => {},
});

// --- Splitter ---

export const Splitter = forwardRef<HTMLDivElement, SplitterProps>(
  ({ orientation = 'horizontal', className, children, ...props }, ref) => {
    // Count panels from children
    const childArray = Children.toArray(children);
    const panelCount = childArray.filter(
      (child) => isValidElement(child) && (child.type as { displayName?: string })?.displayName === 'SplitterPanel',
    ).length;

    const [panelSizes, setPanelSizes] = useState<number[]>(() => {
      // Will be initialized by panels via registerPanel
      return [];
    });

    const [panelConstraints, setPanelConstraints] = useState<
      { minSize: number; maxSize: number }[]
    >([]);

    const registerPanel = useCallback(
      (index: number, constraints: { minSize: number; maxSize: number }) => {
        setPanelConstraints((prev) => {
          const next = [...prev];
          next[index] = constraints;
          return next;
        });
      },
      [],
    );

    // Initialize panel sizes once we know the panel count
    useEffect(() => {
      if (panelCount > 0 && panelSizes.length === 0) {
        const defaultSizes: number[] = [];
        let usedSize = 0;
        let unsetCount = 0;

        // First pass: check for defaultSize on panel children
        let panelIndex = 0;
        childArray.forEach((child) => {
          if (
            isValidElement(child) &&
            (child.type as { displayName?: string })?.displayName === 'SplitterPanel'
          ) {
            const panelProps = child.props as SplitterPanelProps;
            if (panelProps.defaultSize !== undefined) {
              defaultSizes[panelIndex] = panelProps.defaultSize;
              usedSize += panelProps.defaultSize;
            } else {
              unsetCount++;
            }
            panelIndex++;
          }
        });

        // Distribute remaining size evenly
        const remaining = Math.max(0, 100 - usedSize);
        const perPanel = unsetCount > 0 ? remaining / unsetCount : 0;

        const sizes: number[] = [];
        for (let i = 0; i < panelCount; i++) {
          sizes.push(defaultSizes[i] ?? perPanel);
        }
        setPanelSizes(sizes);
      }
    }, [panelCount]);

    // Assign indices to panels and handles
    let panelIndex = 0;
    let handleIndex = 0;
    const enhancedChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      const displayName = (child.type as { displayName?: string })?.displayName;
      if (displayName === 'SplitterPanel') {
        const idx = panelIndex++;
        return cloneElement(child as React.ReactElement<{ _index?: number }>, {
          _index: idx,
        });
      }
      if (displayName === 'SplitterResizeHandle') {
        const idx = handleIndex++;
        return cloneElement(child as React.ReactElement<{ _index?: number }>, {
          _index: idx,
        });
      }
      return child;
    });

    return (
      <SplitterContext.Provider
        value={{ orientation, panelSizes, setPanelSizes, panelConstraints, registerPanel }}
      >
        <div
          ref={ref}
          className={cn(
            'flex w-full h-full',
            orientation === 'horizontal' ? 'flex-row' : 'flex-col',
            className,
          )}
          {...props}
        >
          {enhancedChildren}
        </div>
      </SplitterContext.Provider>
    );
  },
);

Splitter.displayName = 'Splitter';

// --- SplitterPanel ---

interface SplitterPanelInternalProps extends SplitterPanelProps {
  _index?: number;
}

export const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelInternalProps>(
  ({ defaultSize, minSize = 0, maxSize = 100, _index = 0, className, children, style, ...props }, ref) => {
    const { orientation, panelSizes, registerPanel } = useContext(SplitterContext);

    useEffect(() => {
      registerPanel(_index, { minSize, maxSize });
    }, [_index, minSize, maxSize, registerPanel]);

    const size = panelSizes[_index] ?? (100 / Math.max(panelSizes.length, 1));

    return (
      <div
        ref={ref}
        className={cn('overflow-auto', className)}
        style={{
          ...style,
          flex: `0 0 ${size}%`,
          [orientation === 'horizontal' ? 'width' : 'height']: `${size}%`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SplitterPanel.displayName = 'SplitterPanel';

// --- SplitterResizeHandle ---

interface SplitterResizeHandleInternalProps extends SplitterResizeHandleProps {
  _index?: number;
}

export const SplitterResizeHandle = forwardRef<HTMLDivElement, SplitterResizeHandleInternalProps>(
  ({ _index = 0, className, ...props }, ref) => {
    const { orientation, panelSizes, setPanelSizes, panelConstraints } =
      useContext(SplitterContext);
    const handleRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const startPos = useRef(0);
    const startSizes = useRef<number[]>([]);

    const clampSize = (index: number, size: number): number => {
      const constraints = panelConstraints[index];
      if (!constraints) return Math.max(0, Math.min(100, size));
      return Math.max(constraints.minSize, Math.min(constraints.maxSize, size));
    };

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        dragging.current = true;
        startPos.current = orientation === 'horizontal' ? e.clientX : e.clientY;
        startSizes.current = [...panelSizes];

        const handleMouseMove = (ev: MouseEvent) => {
          if (!dragging.current) return;
          const container = handleRef.current?.parentElement;
          if (!container) return;

          const containerRect = container.getBoundingClientRect();
          const containerSize =
            orientation === 'horizontal' ? containerRect.width : containerRect.height;
          const currentPos = orientation === 'horizontal' ? ev.clientX : ev.clientY;
          const deltaPixels = currentPos - startPos.current;
          const deltaPercent = (deltaPixels / containerSize) * 100;

          const leftIndex = _index;
          const rightIndex = _index + 1;

          if (leftIndex >= startSizes.current.length || rightIndex >= startSizes.current.length) {
            return;
          }

          let newLeft = startSizes.current[leftIndex] + deltaPercent;
          let newRight = startSizes.current[rightIndex] - deltaPercent;

          newLeft = clampSize(leftIndex, newLeft);
          newRight = clampSize(rightIndex, newRight);

          // Recalculate to ensure total is preserved
          const total = startSizes.current[leftIndex] + startSizes.current[rightIndex];
          if (newLeft + newRight !== total) {
            if (deltaPercent > 0) {
              newRight = total - newLeft;
              newRight = clampSize(rightIndex, newRight);
              newLeft = total - newRight;
            } else {
              newLeft = total - newRight;
              newLeft = clampSize(leftIndex, newLeft);
              newRight = total - newLeft;
            }
          }

          setPanelSizes((prev) => {
            const next = [...prev];
            next[leftIndex] = newLeft;
            next[rightIndex] = newRight;
            return next;
          });
        };

        const handleMouseUp = () => {
          dragging.current = false;
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      },
      [orientation, panelSizes, _index, setPanelSizes, panelConstraints],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const step = 1;
        let delta = 0;

        if (orientation === 'horizontal') {
          if (e.key === 'ArrowLeft') delta = -step;
          else if (e.key === 'ArrowRight') delta = step;
        } else {
          if (e.key === 'ArrowUp') delta = -step;
          else if (e.key === 'ArrowDown') delta = step;
        }

        if (delta === 0) return;
        e.preventDefault();

        const leftIndex = _index;
        const rightIndex = _index + 1;

        setPanelSizes((prev) => {
          if (leftIndex >= prev.length || rightIndex >= prev.length) return prev;
          const next = [...prev];
          let newLeft = clampSize(leftIndex, next[leftIndex] + delta);
          let newRight = clampSize(rightIndex, next[rightIndex] - delta);

          const total = next[leftIndex] + next[rightIndex];
          if (newLeft + newRight !== total) {
            newRight = total - newLeft;
            newRight = clampSize(rightIndex, newRight);
            newLeft = total - newRight;
          }

          next[leftIndex] = newLeft;
          next[rightIndex] = newRight;
          return next;
        });
      },
      [orientation, _index, setPanelSizes, panelConstraints],
    );

    const currentPercent = panelSizes[_index] ?? 50;

    return (
      <div
        ref={(el) => {
          (handleRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        role="separator"
        aria-orientation={orientation}
        aria-valuenow={Math.round(currentPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        className={cn(
          'shrink-0 bg-neutral-stroke-2 transition-colors duration-fast hover:bg-brand-background focus-visible:bg-brand-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
          orientation === 'horizontal'
            ? 'w-1 cursor-col-resize'
            : 'h-1 cursor-row-resize',
          className,
        )}
        {...props}
      />
    );
  },
);

SplitterResizeHandle.displayName = 'SplitterResizeHandle';
