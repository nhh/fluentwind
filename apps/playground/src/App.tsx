import { useState } from 'react';
import { FluentWindProvider, useTheme } from '@fluentwind/react';
import type { Theme } from '@fluentwind/tokens';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const themes: Theme[] = ['web-light', 'web-dark', 'teams-light', 'teams-dark'];

  return (
    <div className="flex gap-spacing-s mb-spacing-l">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-spacing-m py-spacing-s rounded-medium text-300 transition-colors duration-fast ${
            theme === t
              ? 'bg-brand-background text-neutral-foreground-on-brand'
              : 'bg-neutral-background-3 text-neutral-foreground-1 hover:bg-neutral-background-3-hover'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function TokenShowcase() {
  return (
    <div className="space-y-spacing-l">
      <h1 className="text-800 font-semibold text-neutral-foreground-1 leading-800">
        FluentWind Playground
      </h1>

      <section>
        <h2 className="text-600 font-semibold text-neutral-foreground-1 leading-600 mb-spacing-m">
          Colors
        </h2>
        <div className="flex gap-spacing-s flex-wrap">
          <div className="w-16 h-16 rounded-medium bg-brand-background" title="brand-background" />
          <div
            className="w-16 h-16 rounded-medium bg-neutral-background-1 border border-neutral-stroke-1"
            title="neutral-background-1"
          />
          <div className="w-16 h-16 rounded-medium bg-neutral-background-3" title="neutral-background-3" />
          <div className="w-16 h-16 rounded-medium bg-neutral-background-inverted" title="neutral-background-inverted" />
          <div className="w-16 h-16 rounded-medium bg-status-danger" title="status-danger" />
          <div className="w-16 h-16 rounded-medium bg-status-success" title="status-success" />
          <div className="w-16 h-16 rounded-medium bg-status-warning" title="status-warning" />
        </div>
      </section>

      <section>
        <h2 className="text-600 font-semibold text-neutral-foreground-1 leading-600 mb-spacing-m">
          Typography
        </h2>
        <p className="text-100 leading-100 text-neutral-foreground-1">Caption 2 (10px)</p>
        <p className="text-200 leading-200 text-neutral-foreground-1">Caption 1 (12px)</p>
        <p className="text-300 leading-300 text-neutral-foreground-1">Body 1 (14px)</p>
        <p className="text-400 leading-400 text-neutral-foreground-1">Subtitle 2 (16px)</p>
        <p className="text-500 leading-500 text-neutral-foreground-1">Subtitle 1 (20px)</p>
        <p className="text-600 leading-600 text-neutral-foreground-1">Title 3 (24px)</p>
        <p className="text-700 leading-700 text-neutral-foreground-1">Title 2 (28px)</p>
        <p className="text-800 leading-800 text-neutral-foreground-1">Title 1 (32px)</p>
        <p className="text-900 leading-900 text-neutral-foreground-1">Large Title (40px)</p>
      </section>

      <section>
        <h2 className="text-600 font-semibold text-neutral-foreground-1 leading-600 mb-spacing-m">
          Shadows
        </h2>
        <div className="flex gap-spacing-l flex-wrap">
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-2 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-2</div>
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-4 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-4</div>
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-8 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-8</div>
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-16 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-16</div>
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-28 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-28</div>
          <div className="w-24 h-24 rounded-large bg-neutral-background-1 shadow-64 flex items-center justify-center text-200 text-neutral-foreground-2">shadow-64</div>
        </div>
      </section>

      <section>
        <h2 className="text-600 font-semibold text-neutral-foreground-1 leading-600 mb-spacing-m">
          Border Radius
        </h2>
        <div className="flex gap-spacing-s items-end flex-wrap">
          <div className="w-16 h-16 bg-brand-background rounded-none" title="none" />
          <div className="w-16 h-16 bg-brand-background rounded-small" title="small" />
          <div className="w-16 h-16 bg-brand-background rounded-medium" title="medium" />
          <div className="w-16 h-16 bg-brand-background rounded-large" title="large" />
          <div className="w-16 h-16 bg-brand-background rounded-xlarge" title="xlarge" />
          <div className="w-16 h-16 bg-brand-background rounded-circular" title="circular" />
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('web-light');

  return (
    <FluentWindProvider theme={theme} onThemeChange={setTheme}>
      <div className="min-h-screen bg-neutral-background-1 p-spacing-xl transition-colors duration-normal">
        <ThemeSwitcher />
        <TokenShowcase />
      </div>
    </FluentWindProvider>
  );
}
