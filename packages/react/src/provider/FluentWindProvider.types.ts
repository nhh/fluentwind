import type { Theme, BrandRamp } from '@fluentwind/tokens';

export interface FluentWindProviderProps {
  /** Active theme. Defaults to 'web-light'. */
  theme?: Theme;
  /** Callback when theme changes (for controlled usage). */
  onThemeChange?: (theme: Theme) => void;
  /** Custom brand ramp (16 colors, keys 10–160). Overrides the theme's brand colors. */
  brandRamp?: Partial<BrandRamp>;
  /** Children */
  children: React.ReactNode;
}
