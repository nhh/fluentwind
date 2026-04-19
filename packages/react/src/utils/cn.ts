import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const SIZE_SCALE = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'];
const SPACING_SCALE = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
const RADIUS_SCALE = ['small', 'medium', 'large', 'circular'];
const DURATION_SCALE = ['fast', 'normal', 'slow'];
const SHADOW_SCALE = ['2', '4', '8', '16', '28', '64'];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: SIZE_SCALE }],
      leading: [{ leading: SIZE_SCALE }],
      rounded: [{ rounded: RADIUS_SCALE }],
      'rounded-t': [{ 'rounded-t': RADIUS_SCALE }],
      'rounded-r': [{ 'rounded-r': RADIUS_SCALE }],
      'rounded-b': [{ 'rounded-b': RADIUS_SCALE }],
      'rounded-l': [{ 'rounded-l': RADIUS_SCALE }],
      duration: [{ duration: DURATION_SCALE }],
      shadow: [{ shadow: SHADOW_SCALE }],
      p: [{ p: SPACING_SCALE }],
      px: [{ px: SPACING_SCALE }],
      py: [{ py: SPACING_SCALE }],
      pt: [{ pt: SPACING_SCALE }],
      pr: [{ pr: SPACING_SCALE }],
      pb: [{ pb: SPACING_SCALE }],
      pl: [{ pl: SPACING_SCALE }],
      m: [{ m: SPACING_SCALE }],
      mx: [{ mx: SPACING_SCALE }],
      my: [{ my: SPACING_SCALE }],
      mt: [{ mt: SPACING_SCALE }],
      mr: [{ mr: SPACING_SCALE }],
      mb: [{ mb: SPACING_SCALE }],
      ml: [{ ml: SPACING_SCALE }],
      gap: [{ gap: SPACING_SCALE }],
      'gap-x': [{ 'gap-x': SPACING_SCALE }],
      'gap-y': [{ 'gap-y': SPACING_SCALE }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
