# FluentWind

Fluent 2 Design System components for React, powered by Tailwind CSS v4.

## Packages

| Package | Description |
|---------|-------------|
| `@fluentwind/tokens` | Fluent 2 design tokens as a Tailwind CSS v4 theme preset |
| `@fluentwind/react` | React component library (49 components) |

## Quick Start

```bash
pnpm add @fluentwind/react @fluentwind/tokens
```

### 1. Import the token preset

In your main CSS file:

```css
@import 'tailwindcss';
@import '@fluentwind/tokens/preset.css' theme(static);
```

### 2. Wrap your app

```tsx
import { FluentWindProvider } from '@fluentwind/react';

function App() {
  return (
    <FluentWindProvider theme="web-light">
      {/* your app */}
    </FluentWindProvider>
  );
}
```

### 3. Use components

```tsx
import { Button, Text, Input } from '@fluentwind/react';

function Example() {
  return (
    <div className="flex flex-col gap-m p-l">
      <Text variant="subtitle2">Hello FluentWind</Text>
      <Input placeholder="Type something..." />
      <Button appearance="primary">Submit</Button>
    </div>
  );
}
```

## Themes

Five built-in themes matching Fluent 2:

- `web-light` / `web-dark`
- `teams-light` / `teams-dark`
- `high-contrast`

Switch themes at runtime via `FluentWindProvider` or the `useTheme()` hook.

## Design Tokens

All Fluent 2 tokens are available as Tailwind utilities:

- **Colors**: `bg-brand-background`, `text-neutral-foreground-1`, `border-neutral-stroke-1`
- **Spacing**: `p-s`, `gap-m`, `mx-xl` (none, xxs, xs, s, m, l, xl, xxl, xxxl)
- **Radius**: `rounded-medium`, `rounded-large`, `rounded-circular`
- **Shadows**: `shadow-4`, `shadow-8`, `shadow-16`
- **Typography**: `text-300`, `font-semibold`, `font-base`
- **Motion**: `duration-normal`, `ease-decelerate-mid`

## Development

```bash
pnpm install
pnpm dev          # Start playground + watch mode
pnpm build        # Build all packages
```

## Project Structure

```
fluentwind/
├── packages/
│   ├── tokens/       # Design tokens & Tailwind preset
│   └── react/        # React component library
├── apps/
│   └── playground/   # Demo app with multiple theme showcases
├── turbo.json
└── pnpm-workspace.yaml
```

## License

MIT
