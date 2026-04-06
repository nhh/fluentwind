import { useState, useEffect } from 'react';
import { FluentWindProvider, useTheme, Empty } from '@fluentwind/react';
import type { Theme } from '@fluentwind/tokens';
import { ComponentPage } from './components/ComponentPage';
import { registry } from './demos/registry';

const categories = [
  {
    label: 'General',
    items: ['Button', 'Text', 'Label', 'Link', 'Icon', 'Image', 'Divider'],
  },
  {
    label: 'Data Display',
    items: ['Avatar', 'AvatarGroup', 'Badge', 'Card', 'Persona', 'Tag', 'Statistic', 'Empty', 'Table', 'List', 'Tree', 'Timeline', 'Skeleton', 'Carousel'],
  },
  {
    label: 'Form',
    items: ['Input', 'Textarea', 'Searchbox', 'Select', 'Combobox', 'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'SpinButton', 'DatePicker', 'TimePicker', 'ColorPicker', 'Upload', 'Transfer', 'Field', 'Segmented', 'TagPicker', 'Rating'],
  },
  {
    label: 'Navigation',
    items: ['Tablist', 'Breadcrumb', 'Nav', 'Toolbar', 'Pagination', 'Steps'],
  },
  {
    label: 'Feedback',
    items: ['Spinner', 'ProgressBar', 'Alert', 'MessageBar', 'Toast', 'Popconfirm'],
  },
  {
    label: 'Overlay',
    items: ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Menu', 'Dropdown', 'InfoLabel'],
  },
  {
    label: 'Layout',
    items: ['Accordion', 'FloatButton'],
  },
];

const themes: { value: Theme; label: string }[] = [
  { value: 'web-light', label: 'Light' },
  { value: 'web-dark', label: 'Dark' },
  { value: 'teams-light', label: 'Teams' },
  { value: 'teams-dark', label: 'Teams Dark' },
  { value: 'high-contrast', label: 'HC' },
];

function getHashComponent(): string {
  const hash = window.location.hash.replace('#', '');
  return hash || 'Button';
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-xxs">
      {themes.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setTheme(t.value)}
          className={`px-s py-xxs text-100 rounded-medium border cursor-pointer transition-colors ${
            theme === t.value
              ? 'bg-brand-background-2 text-brand-foreground-2 border-brand-stroke-1'
              : 'bg-neutral-background-1 text-neutral-foreground-2 border-neutral-stroke-2 hover:bg-subtle-background-hover'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Sidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-neutral-background-1 border-r border-neutral-stroke-2 flex flex-col overflow-hidden">
      <div className="p-m space-y-s border-b border-neutral-stroke-2">
        <h1 className="text-500 leading-500 font-semibold text-neutral-foreground-1">FluentWind</h1>
        <ThemeSwitcher />
      </div>

      <nav className="flex-1 overflow-y-auto p-s space-y-m">
        {categories.map((category) => (
          <div key={category.label}>
            <h2 className="text-100 uppercase font-semibold text-neutral-foreground-3 px-m mb-xxs tracking-wide">
              {category.label}
            </h2>
            <ul>
              {category.items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`w-full text-left text-200 px-m py-xs rounded-medium cursor-pointer transition-colors ${
                      selected === item
                        ? 'bg-brand-background-2 text-brand-foreground-2 font-medium'
                        : 'text-neutral-foreground-2 hover:bg-subtle-background-hover'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function Content({ selected }: { selected: string }) {
  const page = registry[selected];

  if (page) {
    return <ComponentPage {...page} />;
  }

  return <Empty description={`Demo for ${selected} coming soon.`} />;
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('web-light');
  const [selected, setSelected] = useState<string>(getHashComponent);

  useEffect(() => {
    const onHashChange = () => setSelected(getHashComponent());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelect = (name: string) => {
    window.location.hash = name;
    setSelected(name);
  };

  return (
    <FluentWindProvider theme={theme} onThemeChange={setTheme}>
      <div className="min-h-screen bg-neutral-background-2 transition-colors duration-normal">
        <Sidebar selected={selected} onSelect={handleSelect} />
        <main className="ml-64 p-xl">
          <Content selected={selected} />
        </main>
      </div>
    </FluentWindProvider>
  );
}
