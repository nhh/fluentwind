import type { ReactElement, ReactNode } from 'react';

export interface TooltipProps {
  /** The content to display in the tooltip. */
  content: ReactNode;
  /** Positioning relative to the trigger. */
  positioning?: 'above' | 'below' | 'before' | 'after';
  /** Visual appearance of the tooltip. */
  appearance?: 'normal' | 'inverted';
  /** ARIA relationship to the trigger element. */
  relationship?: 'label' | 'description';
  /** The trigger element. */
  children: ReactElement;
}
