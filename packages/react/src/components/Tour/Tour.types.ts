import type { ReactNode, RefObject } from 'react';

export interface TourStep {
  target?: RefObject<HTMLElement> | string;
  title: ReactNode;
  description?: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
  steps: TourStep[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (current: number) => void;
}
