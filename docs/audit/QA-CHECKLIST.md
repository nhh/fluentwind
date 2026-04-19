# FluentWind — QA Checklist

> Manual test checklist to validate design-system polish and functionality across all 5 themes.
> Companion to `FINDINGS.md` (what we already know is broken) and `BACKLOG.md` (tracked fixes).
>
> **Run the playground**: `pnpm --filter playground dev` → visit `http://localhost:5173` (default Vite port).
> Switch themes via the sidebar: **Light / Dark / Teams / Teams Dark / HC**.

---

## 0. Pre-flight (blockers — do these first)

- [ ] **Visual regression baselines regenerated** and theme-specific (verify with `md5sum *.png | sort | uniq -c`; no count > 1 per component).
- [ ] Playground starts without console errors in dev tools.
- [ ] All 5 theme buttons in the sidebar are clickable and change the `data-theme` attribute on the provider wrapper.

---

## 1. Theme smoke test (per theme, quick pass)

For **each** of the 5 themes — Light, Dark, Teams, Teams Dark, HC — open the following components in the sidebar and verify:

- [ ] Button (`#Button`)
- [ ] Input (`#Input`)
- [ ] Card (`#Card`)
- [ ] Table (`#Table`)
- [ ] Dialog (`#Dialog`) — open it
- [ ] Menu (`#Menu`) — open it

For each view, confirm:

- [ ] Background is correct for the theme (white/near-white for Light/Teams, near-black for Dark/Teams Dark/HC).
- [ ] Body text is readable against the background.
- [ ] Borders are visible (especially in HC — they should be pure white `#ffffff`).
- [ ] Focus ring appears on Tab and is visible against the background.
- [ ] No hardcoded white/black elements that break theming.

---

## 2. Known-broken components (verify the findings in FINDINGS.md)

### Button — primary in HC

- [ ] Switch to **HC** theme, open `#Button`.
- [ ] Primary button should render **black text on cyan** (`#000000` on `#1aebff`).
- [ ] **FAIL if**: text is white. (This is finding C-2 — the `[color:white]` hack in `Button.tsx:14`.)

### Avatar — "colorful" palette contrast

- [ ] Open `#Avatar`, scroll to "Active State & Colors".
- [ ] In **Light** theme, the `color="colorful"` avatars should all be visibly distinct from the surrounding background.
- [ ] **FAIL if**: any avatar (e.g. initial "C") appears near-white and blends into the card. (Finding m-09.)

### Alert — dismiss hover in all themes

- [ ] Open `#Alert`, hover the close (×) button on each alert variant in each theme.
- [ ] Hover state should be visible in all 5 themes.
- [ ] **FAIL if**: in themes where the alert body is already light, the hover state becomes invisible. (Finding M-3, `hover:bg-white/20`.)

### Overlays — backdrop consistency

- [ ] Open `#Dialog`, `#Drawer`, `#Tour` — trigger each backdrop.
- [ ] Backdrop opacity should **match** across all three (currently Dialog/Drawer use `/40`, Tour uses `/50`).
- [ ] **FAIL if**: Tour backdrop is noticeably darker than Dialog/Drawer. (Findings m-03, m-04, m-05.)
- [ ] In **HC**, backdrops should be solid black (`#000`), not translucent.

### Tour — step indicator target size

- [ ] Open `#Tour`, start the tour.
- [ ] Try to click the step indicator dots at the bottom. They should be easy to hit.
- [ ] **FAIL if**: dots are ≤ 6×6 px and require precise clicking. (Finding m-18, WCAG 2.2 SC 2.5.8.)

### Z-index stacking

- [ ] Open `#Drawer`, open a Drawer.
- [ ] With the Drawer open, trigger a Tooltip and a Toast.
- [ ] **Toast should be above Tooltip**, **Tooltip above Drawer**.
- [ ] If unclear which is on top, that's finding m-02 — unmanaged z-index hierarchy.

---

## 3. Per-component smoke tests (happy path)

Walk through each component in the sidebar and spot-check one interactive state. This catches regressions that static snapshots miss.

### Actions

- [ ] **Button** — all appearances click; focus ring visible on Tab.
- [ ] **Link** — hover underline; visited state (if implemented).
- [ ] **FloatButton** — fixed position; badge (if enabled) is legible.
- [ ] **Popconfirm** — opens, Confirm/Cancel works, dismisses on outside click.
- [ ] **ToggleGroup** — single and multi-select modes; keyboard arrow nav.

### Inputs

- [ ] **Input** — typing works, placeholder styled correctly, disabled state distinct.
- [ ] **PasswordInput** — reveal/hide toggle visible.
- [ ] **Textarea** — resizes vertically.
- [ ] **Searchbox** — clear button appears after typing.
- [ ] **Select / Combobox / Dropdown** — open, keyboard arrow nav, Enter selects.
- [ ] **Cascader** — multi-level navigation works.
- [ ] **TreeSelect** — expand/collapse nodes.
- [ ] **Checkbox** — checked / indeterminate / disabled states distinct.
- [ ] **RadioGroup** — only one selected at a time; keyboard arrow nav.
- [ ] **Switch** — toggles; thumb animates smoothly.
- [ ] **Slider** — drag works; keyboard arrow ±1, PageUp/Down ±10.
- [ ] **SpinButton** — up/down buttons, typing, min/max clamp.
- [ ] **PinInput** — paste distributes across cells; arrow nav between cells.
- [ ] **Segmented** — click to change; indicator animates.
- [ ] **Rating** — click to set; hover to preview.
- [ ] **Mentions** — `@` triggers dropdown; arrow nav.

### Pickers

- [ ] **DatePicker** — open calendar; month/year nav.
- [ ] **TimePicker** — hour/minute selection.
- [ ] **ColorPicker** — swatch click; hex input works.
- [ ] **TagPicker** — type, Enter adds tag, Backspace removes.
- [ ] **Upload** — drag-and-drop visual feedback.
- [ ] **Transfer** — move items between columns via buttons + keyboard.

### Data

- [ ] **Table** — sort columns; row hover.
- [ ] **DataGrid** — virtualization scrolls smoothly; row selection visible.
- [ ] **List** — keyboard nav between items.
- [ ] **Tree** — expand/collapse; keyboard arrow nav.
- [ ] **Calendar** — month nav; today highlighted.
- [ ] **Timeline** — vertical / horizontal orientation both work.
- [ ] **Carousel** — prev/next arrows; dot indicators.
- [ ] **Pagination** — page click; prev/next disabled at bounds.
- [ ] **Descriptions** — label/value alignment correct.

### Layout

- [ ] **Card** — clickable cards show hover affordance.
- [ ] **Divider** — horizontal + vertical orientations.
- [ ] **Accordion** — expand/collapse animation; multiple/single mode.
- [ ] **Tablist** — keyboard Home/End jumps; active indicator animates.
- [ ] **Splitter** — drag to resize.
- [ ] **AspectRatio** — content scales.
- [ ] **ScrollArea** — custom scrollbar visible; keyboard scroll works.
- [ ] **Field** — label + help text + error state all render.
- [ ] **Form** — submit triggers validation; errors show per field.

### Navigation

- [ ] **Nav** — active item highlighted; indicator visible.
- [ ] **Menubar** — top-level hover opens submenu; keyboard nav.
- [ ] **Breadcrumb** — last item non-clickable; overflow truncation.
- [ ] **Toolbar** — overflow menu appears at narrow widths.
- [ ] **Steps** — current / completed / pending states distinct.
- [ ] **Tour** — next/prev/finish; overlay cutout follows target.

### Status & Info

- [ ] **Badge** — dot, number, text variants.
- [ ] **Tag** — dismissible, selectable variants.
- [ ] **Statistic** — up/down trend colors.
- [ ] **Avatar** — image / initials / fallback icon.
- [ ] **AvatarGroup** — overflow count shows.
- [ ] **Persona** — avatar + name + secondary text aligned.
- [ ] **InfoLabel** — tooltip trigger; content correct.

### Feedback

- [ ] **Alert** — all intents (info/success/warning/error).
- [ ] **MessageBar** — dismissible; action button works.
- [ ] **Toast** — triggers, auto-dismisses, stacks correctly.
- [ ] **Notification** — drawer position variants (top/bottom, left/right).
- [ ] **Spinner** — animates smoothly; `prefers-reduced-motion` respected.
- [ ] **ProgressBar** — determinate / indeterminate states.
- [ ] **Skeleton** — shimmer animates; `prefers-reduced-motion` halts it.
- [ ] **Empty** — illustration + description render.

### Overlays

- [ ] **Dialog** — trap focus; Esc closes; outside click (for non-alert).
- [ ] **Drawer** — slides from 4 sides; overlay/push modes both work.
- [ ] **Popover** — anchor positioning flips at viewport edges.
- [ ] **Tooltip** — delay before show; hides on blur.
- [ ] **HoverCard** — opens on hover; delayed dismiss.
- [ ] **Menu** — keyboard arrow nav; submenu expansion.
- [ ] **ContextMenu** — right-click triggers; positions at cursor.

---

## 4. Cross-cutting tests

### Keyboard navigation

- [ ] Tab through a full-page demo (e.g. `#AntAdminPanel`). Focus should never disappear.
- [ ] Shift+Tab works in reverse.
- [ ] Esc closes the topmost open overlay.

### Motion

- [ ] Enable `prefers-reduced-motion` in OS. Reload playground.
- [ ] Animations (Skeleton shimmer, Spinner, Toast slide, Dialog fade) should be disabled or minimal.

### Brand ramp customization

- [ ] Change `brandRamp` in the FluentWindProvider (e.g. via DevTools React props).
- [ ] Primary button / Avatar brand-color / Tablist indicator should all pick up the new ramp.
- [ ] **FAIL if**: Button text or ColorPicker defaultValue stays the original Microsoft blue (findings C-2, p-1).

### Density / zoom

- [ ] Zoom browser to 200%. Text should remain readable, no clipped content.
- [ ] Zoom to 50%. Layouts should not collapse.

### Responsive

- [ ] Resize viewport to 768 px, 1024 px, 1440 px. Playground should adapt.
- [ ] Tablist / Toolbar / Breadcrumb overflow gracefully at narrow widths.

---

## 5. Sign-off

- [ ] All critical findings resolved or explicitly deferred.
- [ ] All major findings resolved or have tracked tickets.
- [ ] Baseline regeneration produces 5 distinct PNGs per component.
- [ ] E2E suite runs green locally.
- [ ] Reviewer name / date: ________________
