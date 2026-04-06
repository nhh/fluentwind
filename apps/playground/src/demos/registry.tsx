import type { ComponentPageProps } from '../components/ComponentPage';
import { generalDemos } from './general';
import { dataDisplayDemos } from './dataDisplay';
import { formDemos } from './form';
import { navigationDemos } from './navigation';
import { feedbackDemos } from './feedback';
import { overlayDemos } from './overlay';
import { layoutDemos } from './layout';
import { newComponentDemos } from './newComponents';

export const registry: Record<string, ComponentPageProps> = {
  ...generalDemos,
  ...dataDisplayDemos,
  ...formDemos,
  ...navigationDemos,
  ...feedbackDemos,
  ...overlayDemos,
  ...layoutDemos,
  ...newComponentDemos,
};
