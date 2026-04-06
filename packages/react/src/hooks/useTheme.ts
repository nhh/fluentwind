import { useContext } from 'react';
import { ThemeContext } from '../provider/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <FluentWindProvider>');
  }
  return context;
}
