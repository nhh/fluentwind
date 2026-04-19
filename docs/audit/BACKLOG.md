# Visual-Polish Audit — Fix Backlog

> Generated from `visual-polish-2026-04.json`. See `README.md` for severity rubric.

**How to use this list**: each row is a standalone, actionable fix. Tackle critical → major → minor → polish. Every fix should include a regression test (E2E or unit) before being marked done; the existing visual-regression suite is unreliable until the audit-infrastructure critical is resolved.

## Critical (2)

| # | Component | Check | Fix | Status |
|---|---|---|---|---|
| C-1 | `_global` | audit-infrastructure | `switchTheme` fixture now asserts `data-theme` via `waitForFunction` (`apps/playground/e2e/fixtures/base.ts`). Baseline regeneration still needed: `pnpm --filter playground exec playwright test visual --update-snapshots`. | **fixture fixed**, baselines pending |
| C-2 | Button | high-contrast | Restored `text-neutral-foreground-on-brand` in `Button.tsx:14`. Root cause was `tailwind-merge` treating `text-300` (font-size token) and `text-white` (color) as conflicting; fixed by configuring `extendTailwindMerge` in `utils/cn.ts` to register custom font-size, leading, rounded, duration, shadow, and spacing scales as proper class groups. | **done** |

## Major (3)

| # | Component | Check | Fix | Status |
|---|---|---|---|---|
| M-1 | `_global` | high-contrast | Use the `hc:` custom variant in components that need structural HC tweaks. Minimum targets: (a) Button primary — once C-2 is fixed, verify HC still has a visible border since the cyan-on-black primary needs separation; (b) Card — add `hc:border hc:border-neutral-stroke-1` for elevation-replacement; (c) any shadow-only affordance (HoverCard, Popover, Dropdown, etc.) — add `hc:border` fallback. | pending |
| M-2 | Button | color-tokens | Resolved as part of C-2 — `text-neutral-foreground-on-brand` now flows through the token and brand-ramp customization propagates. | **done** |
| M-3 | Alert | color-tokens | Replace `hover:bg-white/20` (`Alert.tsx:119`) with a semantic hover token (`hover:bg-subtle-background-hover` or a new `bg-inverse-hover` token depending on Alert's current surface). Ensure it works in all 5 themes. | pending |

## Minor (20)

| # | Component | Check | Fix |
|---|---|---|---|
| m-01 | `_global` | motion-tokens | Replace raw ms values in `animate-[fw-*_150ms_var(--ease-*)]` shorthand (15 sites) with token references. Either define named animation utility classes in tokens CSS, or compose duration via `var(--duration-*)` inside the animate string. |
| m-02 | `_global` | spacing-grid (z-index) | Introduce `--z-dropdown`, `--z-overlay`, `--z-modal`, `--z-toast`, `--z-tooltip` tokens. Replace all `z-50`, `z-[999]`, `z-[1000]`, `z-[9998]`, `z-[9999]`, `z-[1]` usages. Document the stacking hierarchy. |
| m-03 | Drawer | color-tokens | Introduce `--color-backdrop` / `--color-scrim`. Replace `bg-black/40` in `Drawer.tsx:120`. |
| m-04 | Dialog | color-tokens | Replace `backdrop:bg-black/40` (`Dialog.tsx:65`) with the scrim token from m-03. |
| m-05 | Tour | color-tokens | Replace `bg-black/50` (`Tour.tsx:157`) with the scrim token from m-03 and align opacity with Dialog/Drawer. |
| m-06 | Badge | typography-tokens | Replace `text-[0px]` (`Badge.tsx:11-12`) with `sr-only` or `text-transparent` for `tiny`/`extraSmall`. |
| m-07 | Avatar | typography-tokens | Either extend typography scale with `text-50`/`text-75` tokens or introduce `--text-avatar-*` for the `text-[8px]`/`text-[10px]` sites in `Avatar.tsx:6-7`. |
| m-08 | Avatar | spacing-grid | Replace `h-[72px] w-[72px]` / `h-[120px] w-[120px]` with size tokens or Tailwind scale equivalents in `Avatar.tsx:16,18`. |
| m-09 | Avatar | color-tokens | Audit the `colorful` variant palette. Remove or replace the slot that renders near-white against `neutral-background-1`. Target: every slot ≥ 3:1 contrast against the lightest theme surface. |
| m-10 | Checkbox | typography-tokens | Introduce an `--size-icon-*` token and replace `text-[10px]`/`text-[14px]` in `Checkbox.tsx:6-7`. |
| m-11 | FloatButton | typography-tokens | Use the `--size-icon-*` token from m-10 to replace `text-[20px]` in `FloatButton.tsx:48`. |
| m-12 | FloatButton | spacing-grid | Introduce a badge-bubble size token; replace `min-w-[18px] h-[18px]` in `FloatButton.tsx:68`. |
| m-13 | Spinner | radius-tokens (stroke) | Introduce a stroke-width token scale; replace `border-[1.5px]` / `border-[3px]` in `Spinner.tsx:6-7,10-11`. |
| m-14 | RadioGroup | radius-tokens | Replace `checked:border-[5px]` (`RadioGroup.tsx:95`) with a `::after` pseudo-element dot sized via token, so the dot scales with the radio size variant. |
| m-15 | Switch | spacing-grid | Rework thumb positioning in `Switch.tsx:43` to use `translate-x-*` with size-aware token values instead of absolute `left-[3px]`/`left-[23px]`. |
| m-16 | Drawer | spacing-grid | Introduce `--size-drawer-small/medium/large` tokens; replace `Drawer.tsx:8-17`. |
| m-17 | Dialog | spacing-grid | Introduce `--size-overlay-*` tokens shared across Dialog, Popover, HoverCard, Tour; replace `max-w-[600px]` in `Dialog.tsx:86`. |
| m-18 | Tour | state-distinctness | Enlarge step indicator click target to ≥ 24×24 in `Tour.tsx:192` (keep the visual dot small with an invisible padding zone, so WCAG 2.2 SC 2.5.8 passes without visual change). |
| m-19 | Mentions | spacing-grid | Replace `w-[24px] h-[24px]` (`Mentions.tsx:209`) with `<Avatar size={24}>` or `w-6`. |
| m-20 | Slider | spacing-grid | Compute thumb offset from track/thumb size tokens instead of `-mt-[7px]` in `Slider.tsx:17`. |

## Dark-mode (11) — from `dark-mode-check.spec.ts` bypass pass

These findings come from the standalone dark-mode spec that asserts `data-theme="web-dark"` at screenshot time, sidestepping the C-1 blocker. Each is a real dark-theme visual bug.

| # | Component | Check | Fix |
|---|---|---|---|
| # | Component | Check | Fix | Status |
|---|---|---|---|---|
| D-1 | Button | state-distinctness (major) | Added `dark:bg-neutral-background-6 dark:border-neutral-stroke-accessible` to `secondary` appearance (`Button.tsx:12`) so it elevates visibly above Card surfaces in dark. Primary/outline/subtle/transparent hierarchy now distinguishable. | **done** |
| D-2 | Card | dark-mode (major) | `filledAlternative` now uses `dark:bg-neutral-background-6` — visibly elevated above body. `subtle` adds `dark:border dark:border-neutral-stroke-2` for visible bounds. (`Card.tsx:10-19`) | **done** |
| D-3 | Card | dark-mode (minor) | Deferred — requires change to `CardTitle` component (separate file). | pending |
| D-4 | Badge | dark-mode (major) | Added `dark:` overrides in `Badge.tsx:32-51`: `ghost.*` all get a contextual border in dark; `filled.subtle` and `filled.informative` use brighter bg; `filled.important` gets a subtle border. | **done** |
| D-5 | Tag | dark-mode (major) | `filled` appearance now uses `dark:bg-neutral-background-6` (lighter than card, prominent chip). `disabled` uses `dark:opacity-60` for more perceptibility. (`Tag.tsx:11, 60`) | **done** |
| D-6 | Avatar | dark-mode (major) | `colorful` variant uses `dark:bg-brand-background-static dark:text-neutral-foreground-on-brand` — proper visible brand color on dark. `neutral` uses `dark:text-neutral-foreground-1` for readable initials. (`Avatar.tsx:23-26`) | **done** |
| D-7 | Input | dark-mode (minor) | Deferred to next pass. | pending |
| D-8 | Checkbox | dark-mode (minor) | Deferred to next pass. | pending |
| D-9 | Accordion | dark-mode (minor) | Deferred to next pass. | pending |
| D-10 | DataGrid / Table | dark-mode (minor) | Deferred to next pass. | pending |
| D-11 | Spinner | dark-mode (minor) | Deferred to next pass. | pending |

**Note on Dialog / Menu / Toast / Tooltip trigger low-contrast**: this is a downstream symptom of D-1 — fixing Button `secondary` in dark resolves all four simultaneously. No separate entry.

## Polish (3)

| # | Component | Check | Fix |
|---|---|---|---|
| p-1 | ColorPicker | color-tokens | Make `defaultValue` default to `var(--fw-brand-background)` in `ColorPicker.tsx:59` so brand-ramp customization takes effect. Keep the 14 hex swatches (brand-independent display colors). |
| p-2 | Nav | spacing-grid | Introduce an indicator-width token; replace `before:w-[2px]` in `Nav.tsx:49`. Share with p-3. |
| p-3 | Tablist | spacing-grid | Use the indicator-width token from p-2; replace `after:h-[2px]`/`after:w-[2px]` in `Tablist.tsx:125,128`. |

## Recommended order of work

1. **C-1** first, alone. Until baselines are trustworthy, you're fixing blind.
2. **C-2 + M-2** together (same file, same root cause).
3. **M-1** before touching any individual overlay/card, since it defines how HC tweaks are layered.
4. **D-1 + D-2** early — Button appearance hierarchy + Card `subtle`/`filledAlternative` are the biggest dark-mode papercuts and likely share root causes with token mappings in `web-dark.css`. Fix them before other D-* items so the cascade propagates.
5. **D-4, D-5, D-6** batch — three "invisible variant" bugs (Badge ghost/informative/subtle, Tag filled/disabled, Avatar colorful) all need dark-theme token palette work. Audit `web-dark.css` once.
6. **m-02** (z-index tokens) before m-03..m-05 (scrim tokens), since scrims need z-index anyway.
7. Remaining D-* and minor items can be batched by file (Avatar m-07/m-08/m-09/D-6 together; FloatButton m-11/m-12 together; Nav/Tablist p-2/p-3 together).
8. Polish items last.

After each minor/polish fix: re-run `pnpm --filter playground exec playwright test visual` (baselines now trustworthy) to catch accidental regressions in other components. For dark-specific fixes, re-run the bypass spec: `pnpm --filter playground exec playwright test -c docs/audit/dark.playwright.config.ts`.
