import { useState, useMemo, useCallback } from 'react';
import type { Theme } from '@fluentwind/tokens';
import { ThemeContext } from './ThemeContext';
import type { FluentWindProviderProps } from './FluentWindProvider.types';

const BRAND_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160] as const;

export function FluentWindProvider({
  theme: controlledTheme,
  onThemeChange,
  brandRamp,
  children,
}: FluentWindProviderProps) {
  const [internalTheme, setInternalTheme] = useState<Theme>('web-light');

  const theme = controlledTheme ?? internalTheme;

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (onThemeChange) {
        onThemeChange(newTheme);
      } else {
        setInternalTheme(newTheme);
      }
    },
    [onThemeChange],
  );

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  // Build inline style for custom brand ramp overrides
  const brandStyle = useMemo(() => {
    if (!brandRamp) return undefined;
    const style: Record<string, string> = {};
    for (const step of BRAND_STEPS) {
      if (brandRamp[step]) {
        style[`--fw-brand-${step}`] = brandRamp[step]!;
      }
    }
    return Object.keys(style).length > 0 ? style : undefined;
  }, [brandRamp]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div data-theme={theme} style={brandStyle}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
