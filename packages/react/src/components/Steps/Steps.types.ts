import type { HTMLAttributes, ReactNode } from 'react';

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  current?: number;
  size?: 'small' | 'medium';
  orientation?: 'horizontal' | 'vertical';
}

export interface StepItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
  stepNumber?: number;
}
