# Visual-Polish Audit — Findings

> Generated from `visual-polish-2026-04.json`. See `README.md` for methodology and severity rubric.

## Executive summary

42 findings across 23 components / 3 global concerns. Severity distribution:

| Severity | Count |
|---|---|
| critical | 2 |
| major | 8 |
| minor | 29 |
| polish | 3 |

**Audit blocker** — the planned snapshot-based per-theme review could not be completed. The 400 PNG baselines under `apps/playground/e2e/visual/component-screenshots.spec.ts-snapshots/` resolve to 80 unique images each duplicated across 5 theme names (verified via `md5sum`). No theme-specific rendering is captured. See the `_global / audit-infrastructure` critical finding below. Source-only findings (pass 3) are the primary evidence for light-theme issues.

**Dark-mode pass (bypass track)** — to unblock the dark-mode review without fixing the baseline infra, a standalone Playwright spec (`docs/audit/dark-mode-check.spec.ts`) captures `main` after explicitly asserting `data-theme="web-dark"` on the provider wrapper. 20 components screenshotted; findings appear in the "Dark mode (web-dark)" section below.

**Themes reviewed**: web-light (source) + web-dark (bypass spec). Teams-light / teams-dark / high-contrast still blocked on baseline fix.

---

## `_global` — audit infrastructure

### [critical] audit-infrastructure — `all` themes

The 840-test visual regression suite is hollow. Every component × theme baseline is byte-identical to its siblings (80 unique PNGs × 5 = 400 total files). The `switchTheme(...)` fixture selects the theme button, but the screenshotted `main` element does not reflect a theme change — either because:

- `page.goto(...)` in `navigateToComponent` resets React state (`useState<Theme>('web-light')` in `App.tsx:141`), and the subsequent theme click + 400 ms `waitForTimeout` are not actually captured before the screenshot fires, **or**
- the baselines pre-date commit `f534478` ("Fix theme switching") and were never regenerated.

All tests trivially pass because the identical rendered screenshot matches the identical stored baseline.

**Required to unblock per-theme audit**:

1. Add a DOM assertion in the `switchTheme` fixture that the provider wrapper's `data-theme` attribute equals the requested theme at screenshot time.
2. Regenerate baselines: `pnpm --filter playground exec playwright test visual --update-snapshots`.
3. Re-run `md5sum *.png | awk '{print $1}' | sort | uniq -c | sort -rn | head` — if any hash count is ≥ 2, switching is still broken.

Evidence: `apps/playground/e2e/visual/component-screenshots.spec.ts-snapshots/`

---

## `_global` — other

### [major] high-contrast — `high-contrast` theme

The `hc:` custom variant is defined in `packages/tokens/src/preset.css:21` but **never used** in any component under `packages/react/src/components`. Components cannot add HC-specific tweaks (forced borders on filled surfaces, disabled shadows, alternate layouts). All HC behavior is locked to token substitution, which can't express structural changes.

Audit targets that probably need `hc:` overrides:
- Button (primary text — see critical finding)
- Card (needs HC border since elevation becomes meaningless)
- Every shadow-only affordance (shadows don't render meaningfully in HC)

Evidence: `packages/tokens/src/preset.css:21`

### [minor] motion-tokens — `all` themes

Animation shorthand classes embed raw durations across 10+ components:

> `animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]`

The easing is tokenized via `var(--ease-*)`, but the duration (`150ms`, `200ms`, `250ms`) is hardcoded. Changing `--duration-normal` won't propagate. Affects: Dialog, Drawer, Tour, Tooltip, Popover, Menu, Mentions, ContextMenu, Popconfirm, HoverCard, Menubar, Dropdown, Notification, Toast, Skeleton.

Evidence: `packages/react/src/components/Dialog/Dialog.tsx:65`

### [minor] spacing-grid (z-index) — `all` themes

Z-index is unmanaged — raw values scattered across components:

- `z-50` in 8 overlay components (Dropdown, ContextMenu, HoverCard, Mentions, Menu, Menubar, Popconfirm, Popover, Tooltip)
- `z-[999]`, `z-[1000]` in Drawer
- `z-[9998]`, `z-[9999]` in Tour, Toast, Notification
- `z-[1]` in DataGrid, Segmented

Stacking order is not enforced by tokens. Introduce `--z-dropdown` / `--z-overlay` / `--z-modal` / `--z-toast` / `--z-tooltip`.

Evidence: `packages/react/src/components/Drawer/Drawer.tsx:92`

---

## Button

### [critical] high-contrast — `high-contrast` theme

Primary appearance hardcodes `[color:white]` (`Button.tsx:14`). In HC theme:

- `--fw-neutral-foreground-on-brand` is `#000000`
- `--fw-brand-background` is `#1aebff` (bright cyan)

The component renders white-on-cyan in HC — WCAG AA fail, near-illegible. This is the "fix primary button white text eaten by tailwind-merge" workaround (commit `89996a5`), which bypasses the token rather than fixing the merge collision.

**Proper fix**: restore `text-neutral-foreground-on-brand` and resolve the `twMerge` collision at the `cn()` level — apply the token class after the appearance variant, or configure `tailwind-merge`'s classGroup for text-color aliases so the `[color:white]` arbitrary value and `text-*` token aren't treated as the same group.

Evidence: `packages/react/src/components/Button/Button.tsx:14`

### [major] color-tokens — `all` themes

Same root cause as the critical finding above. Even in light/dark themes, `[color:white]` is an escape hatch that future token edits (brand ramp customization, contrast adjustments) cannot propagate into.

Evidence: `packages/react/src/components/Button/Button.tsx:14`

---

## Alert

### [major] color-tokens — `all` themes

Dismiss button uses `hover:bg-white/20` (`Alert.tsx:119`) instead of a semantic token. Breaks on themes where the alert background is already light (MessageBar-style inverse appearances). Replace with a `subtle-background-hover` or dedicated token.

Evidence: `packages/react/src/components/Alert/Alert.tsx:119`

---

## Avatar

### [minor] typography-tokens — `all` themes

Sizes 16 and 20 use `text-[8px]` / `text-[10px]` (`Avatar.tsx:6-7`). Below the typography token scale minimum (`text-100` = 12px). Either extend the scale or introduce dedicated avatar-text-size tokens.

Evidence: `packages/react/src/components/Avatar/Avatar.tsx:6`

### [minor] spacing-grid — `all` themes

Sizes 72 and 120 use `h-[72px] w-[72px]` / `h-[120px] w-[120px]` (`Avatar.tsx:16,18`). Off the Tailwind spacing scale.

Evidence: `packages/react/src/components/Avatar/Avatar.tsx:16`

### [minor] color-tokens — `web-light` theme

In the demo "Active State & Colors" row, `color="colorful"` with initial `C` renders near-white — very low contrast with `neutral-background-1`. The deterministic hash-to-color mapping includes a palette slot too close to white. Audit the `colorful` palette and remove/replace any slot that drops below 3:1 non-text contrast against the surface background.

Evidence: `apps/playground/e2e/visual/component-screenshots.spec.ts-snapshots/Avatar-web-light-chromium-win32.png`

---

## Badge

### [minor] typography-tokens — `all` themes

Sizes `tiny` and `extraSmall` use `text-[0px]` (`Badge.tsx:11-12`) to hide text. An `sr-only` pattern or `visibility:hidden` would be more semantic.

Evidence: `packages/react/src/components/Badge/Badge.tsx:11`

---

## Checkbox

### [minor] typography-tokens — `all` themes

Icon sizes use `text-[10px]` / `text-[14px]` (`Checkbox.tsx:6-7`). Consider an `--size-icon-*` token rather than leaning on `text-size`.

Evidence: `packages/react/src/components/Checkbox/Checkbox.tsx:6`

---

## ColorPicker

### [polish] color-tokens — `all` themes

Default swatch palette hardcodes 14 hex values (`ColorPicker.tsx:7-20`). Acceptable for a color picker's default palette. However, `defaultValue = "#0078D4"` (line 59) is a hardcoded Microsoft blue that should default to `--fw-brand-background` so brand-ramp customization takes effect.

Evidence: `packages/react/src/components/ColorPicker/ColorPicker.tsx:59`

---

## Dialog

### [minor] color-tokens — `all` themes

Backdrop uses `backdrop:bg-black/40` (`Dialog.tsx:65`). Should come from a scrim/backdrop token shared with Drawer and Tour.

Evidence: `packages/react/src/components/Dialog/Dialog.tsx:65`

### [minor] spacing-grid — `all` themes

Dialog panel sets `max-w-[600px]` inline (`Dialog.tsx:86`). Other overlays use different caps (HoverCard 280, Popover 200, Tour 340). No shared overlay-max-width token.

Evidence: `packages/react/src/components/Dialog/Dialog.tsx:86`

---

## Drawer

### [minor] color-tokens — `all` themes

Backdrop uses `bg-black/40` (`Drawer.tsx:120`). Same as Dialog — should come from a scrim/backdrop token.

Evidence: `packages/react/src/components/Drawer/Drawer.tsx:120`

### [minor] spacing-grid — `all` themes

Size map uses `w-[320px]/[480px]/[640px]` and `h-[30vh]/[50vh]/[70vh]` (`Drawer.tsx:8-17`). Reasonable, but worth tokenizing for consistency with other overlays.

Evidence: `packages/react/src/components/Drawer/Drawer.tsx:8`

---

## FloatButton

### [minor] typography-tokens — `all` themes

Icon wrapper uses `text-[20px]` (`FloatButton.tsx:48`). Should use an icon-size token.

Evidence: `packages/react/src/components/FloatButton/FloatButton.tsx:48`

### [minor] spacing-grid — `all` themes

Badge bubble uses `min-w-[18px] h-[18px]` (`FloatButton.tsx:68`). Off the spacing scale.

Evidence: `packages/react/src/components/FloatButton/FloatButton.tsx:68`

---

## Mentions

### [minor] spacing-grid — `all` themes

Avatar thumbnail uses `w-[24px] h-[24px]` (`Mentions.tsx:209`). Use `<Avatar size={24}>` or `w-6`.

Evidence: `packages/react/src/components/Mentions/Mentions.tsx:209`

---

## Nav

### [polish] spacing-grid — `all` themes

Active indicator uses `before:w-[2px]` (`Nav.tsx:49`). 2px is below the 4px grid. Shared with Tablist — both should consume an indicator-width token.

Evidence: `packages/react/src/components/Nav/Nav.tsx:49`

---

## RadioGroup

### [minor] radius-tokens — `all` themes

Selected state uses `checked:border-[5px]` (`RadioGroup.tsx:95`) to create the inner dot via thick border. Works but arbitrary; also makes the dot non-responsive to the radio size prop.

Evidence: `packages/react/src/components/RadioGroup/RadioGroup.tsx:95`

---

## Slider

### [minor] spacing-grid — `all` themes

Thumb offset uses `-mt-[7px]` (`Slider.tsx:17`). Fragile if track or thumb size tokens change.

Evidence: `packages/react/src/components/Slider/Slider.tsx:17`

---

## Spinner

### [minor] radius-tokens — `all` themes

Border widths `border-[1.5px]` / `border-[3px]` (`Spinner.tsx:6-7,10-11`). Not in the border-width token set. A stroke-width scale token would help.

Evidence: `packages/react/src/components/Spinner/Spinner.tsx:6`

---

## Switch

### [minor] spacing-grid — `all` themes

Thumb position hardcoded via `left-[3px] peer-checked:left-[23px]` (`Switch.tsx:43`). Off the spacing scale and non-responsive to size variants. Tokens or computed positioning via `translate` would be more flexible.

Evidence: `packages/react/src/components/Switch/Switch.tsx:43`

---

## Tablist

### [polish] spacing-grid — `all` themes

Active indicator uses `after:h-[2px]` / `after:w-[2px]` (`Tablist.tsx:125,128`). Same 2px off-grid as Nav — share an indicator-width token.

Evidence: `packages/react/src/components/Tablist/Tablist.tsx:125`

---

## Tour

### [minor] color-tokens — `all` themes

Backdrop uses `bg-black/50` (`Tour.tsx:157`) — heavier than Dialog/Drawer (`/40`). Inconsistent opacity for the same conceptual element.

Evidence: `packages/react/src/components/Tour/Tour.tsx:157`

### [minor] state-distinctness — `all` themes

Step indicator dots use `w-[6px] h-[6px]` (`Tour.tsx:192`). If clickable, fails WCAG 2.2 SC 2.5.8 (24×24 target size). Off-scale regardless.

Evidence: `packages/react/src/components/Tour/Tour.tsx:192`

---

## Dark mode (web-dark) — bypass-spec findings

> Captured via `docs/audit/dark-mode-check.spec.ts`; screenshots at `docs/audit/dark-screenshots/*.png`.

### Button — [major] state-distinctness — web-dark

`Secondary`, `Outline`, `Subtle`, and `Transparent` appearances collapse into visually identical dark chips. Button hierarchy is lost in dark: a user cannot tell which action is secondary vs tertiary. Root cause is token resolution — each appearance's background is too close to `neutral-background-1` (the surrounding card) in `web-dark.css`. Fix either by retuning the per-appearance tokens or by layering appearance-specific borders / tonal overrides in dark.

Also minor: disabled vs disabled-focusable are indistinguishable in dark.

Evidence: `docs/audit/dark-screenshots/Button.png`

### Card — [major] dark-mode — web-dark

Two failures:

1. **`Subtle` appearance has no visible bounds.** The card silhouette disappears entirely on the dark body, which defeats the purpose of the Card primitive.
2. **`FilledAlternative` is darker than the body background**, creating a "hole in the page" rather than elevation. Fluent's intent is that filledAlternative sits slightly **above** the base surface — but in `web-dark.css` the tokens are ordered so `neutral-background-3` (card) is darker than `neutral-background-2` (body). Either swap the dark-theme mapping, or add `hc:`-style structural overrides.

Minor: Card titles render in `neutral-foreground-2` and visually recede more than primary headings should.

Evidence: `docs/audit/dark-screenshots/Card.png`

### Badge — [major] dark-mode — web-dark

Multiple badge appearances are broken in dark:

- `Ghost` — invisible (transparent on transparent, no border).
- `Informative` — near-black foreground on near-black background.
- `Subtle` — invisible.
- `Important` — inverts correctly but renders harsh white-on-black with no border.

The palette tokens don't have dark-theme equivalents for several Badge variants.

Evidence: `docs/audit/dark-screenshots/Badge.png`

### Tag — [major] dark-mode — web-dark

Three failures:

- `Filled` — text illegible (dim gray on dim gray).
- `Small` size — essentially unreadable due to low-contrast + small text combined.
- `Disabled` — invisible.

Tag needs a dedicated dark-theme fill or a higher-contrast foreground token.

Evidence: `docs/audit/dark-screenshots/Tag.png`

### Avatar — [major] dark-mode — web-dark

In the "Active State & Colors" demo, two of the `colorful` palette slots (initials `C` and `N`) render as near-black circles on the near-black card surface — effectively invisible. The deterministic hash-to-color palette must include slots that pass ≥ 3:1 contrast against **both** the lightest and darkest theme surfaces. This is the dark-mode counterpart to the existing web-light `colorful` finding.

Evidence: `docs/audit/dark-screenshots/Avatar.png`

### Input — [minor] dark-mode — web-dark

`Filled lighter` appearance in dark is nearly indistinguishable from the surrounding card surface — the input's boundary dissolves. Adjust the filledLighter token or rely on a stronger border-bottom in dark.

Evidence: `docs/audit/dark-screenshots/Input.png`

### Checkbox — [minor] dark-mode — web-dark

Unchecked-state border (`neutral-stroke-1/2`) is very subtle against a dark card — easy to miss in a dense form. Disabled-unchecked is nearly invisible. Use `neutral-stroke-accessible` for the unchecked state in dark to meet 3:1 for active UI components (WCAG 1.4.11).

Evidence: `docs/audit/dark-screenshots/Checkbox.png`

### Accordion — [minor] dark-mode — web-dark

Item separators and chevron/arrow icons render extremely dim in dark — collapsed items visually blend into one strip. Raise separator token contrast or use a visible divider color in dark.

Evidence: `docs/audit/dark-screenshots/Accordion.png`

### DataGrid — [minor] dark-mode — web-dark

Alternating row backgrounds (zebra striping) are nearly identical in dark — the row-alt token isn't differentiated enough from `neutral-background-1`. Widen the gap slightly for scanability.

Evidence: `docs/audit/dark-screenshots/DataGrid.png`

### Table — [minor] dark-mode — web-dark

Row separators render very faint in dark, reducing row separation when no hover is active.

Evidence: `docs/audit/dark-screenshots/Table.png`

### Spinner — [minor] dark-mode — web-dark

`Primary` appearance spinner shows a dim gray track instead of brand color in dark — users cannot tell it is animating against the card. Verify the primary appearance reads `--fw-brand-stroke-1` (or equivalent) rather than a neutral token. Label text (`Loading...`) is also too dim in dark.

Evidence: `docs/audit/dark-screenshots/Spinner.png`

### `_global` — [minor] dark-mode — web-dark

Across Dialog, Menu, Toast, Tooltip demos the trigger buttons consistently render low-contrast in dark — this is a downstream symptom of the Button dark-appearance finding. Fixing Button `secondary` in dark resolves these simultaneously.

Evidence: `docs/audit/dark-screenshots/Dialog.png`, `Menu.png`, `Toast.png`, `Tooltip.png`

---

## Components with zero findings in this pass

The following `ALL_COMPONENTS` entries were not flagged by Pass 3 (source grep) and — for the teams-* and high-contrast themes — could not be visually reviewed because of the baseline blocker. They are deferred:

Link, Popconfirm, ToggleGroup, Text, Label, Icon, Image, QRCode, PasswordInput, Textarea, Searchbox, Select, Combobox, Dropdown, Cascader, TreeSelect, SpinButton, PinInput, Segmented, Rating, DatePicker, TimePicker, TagPicker, Upload, Transfer, List, Tree, Calendar, Timeline, Carousel, Pagination, Descriptions, Divider, Splitter, AspectRatio, ScrollArea, Field, Menubar, Breadcrumb, Toolbar, Steps, Statistic, AvatarGroup, Persona, InfoLabel, MessageBar, Notification, ProgressBar, Skeleton, Empty, Popover, HoverCard, ContextMenu.

Regenerate baselines to complete the per-theme review for these in teams/HC themes.
