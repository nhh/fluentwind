import type { ReactNode } from 'react';
import type { LabelProps } from '../Label/Label.types';

export interface InfoLabelProps extends LabelProps {
  /** Info content displayed in a popover on click of the info icon. */
  info: ReactNode;
}
