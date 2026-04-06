export const ALL_COMPONENTS = [
  // Actions
  'Button', 'Link', 'FloatButton', 'Popconfirm', 'ToggleGroup',
  // Text & Icons
  'Text', 'Label', 'Icon', 'Image', 'QRCode',
  // Inputs
  'Input', 'PasswordInput', 'Textarea', 'Mentions', 'Searchbox',
  'Select', 'Combobox', 'Dropdown', 'Cascader', 'TreeSelect',
  'Checkbox', 'RadioGroup', 'Switch', 'Slider', 'SpinButton',
  'PinInput', 'Segmented', 'Rating',
  // Pickers
  'DatePicker', 'TimePicker', 'ColorPicker', 'TagPicker', 'Upload', 'Transfer',
  // Data
  'Table', 'DataGrid', 'List', 'Tree', 'Calendar', 'Timeline',
  'Carousel', 'Pagination', 'Descriptions',
  // Layout
  'Card', 'Divider', 'Accordion', 'Tablist', 'Splitter',
  'AspectRatio', 'ScrollArea', 'Field', 'Form',
  // Navigation
  'Nav', 'Menubar', 'Breadcrumb', 'Toolbar', 'Steps', 'Tour',
  // Status & Info
  'Badge', 'Tag', 'Statistic', 'Avatar', 'AvatarGroup', 'Persona', 'InfoLabel',
  // Feedback
  'Alert', 'MessageBar', 'Toast', 'Notification', 'Spinner',
  'ProgressBar', 'Skeleton', 'Empty',
  // Overlays
  'Dialog', 'Drawer', 'Popover', 'Tooltip', 'HoverCard', 'Menu', 'ContextMenu',
] as const;

export type ComponentName = (typeof ALL_COMPONENTS)[number];
