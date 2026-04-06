import { useState } from 'react';
import {
  Input,
  Textarea,
  Searchbox,
  Select,
  Combobox,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  SpinButton,
  DatePicker,
  TimePicker,
  ColorPicker,
  Upload,
  Transfer,
  Field,
  Segmented,
  TagPicker,
  Rating,
} from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Interactive helper components ── */

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Accept terms and conditions"
    />
  );
}

function MixedCheckbox() {
  const [items, setItems] = useState([true, false, true]);
  const allChecked = items.every(Boolean);
  const noneChecked = items.every((v) => !v);
  return (
    <div className="space-y-s">
      <Checkbox
        checked={allChecked ? true : noneChecked ? false : undefined}
        onChange={() => {
          const next = !allChecked;
          setItems([next, next, next]);
        }}
        label="Select all"
      />
      <div className="ml-l space-y-xs">
        {['Apples', 'Bananas', 'Oranges'].map((fruit, i) => (
          <Checkbox
            key={fruit}
            checked={items[i]}
            onChange={() => {
              const next = [...items];
              next[i] = !next[i];
              setItems(next);
            }}
            label={fruit}
          />
        ))}
      </div>
    </div>
  );
}

function ControlledRadioGroup() {
  const [value, setValue] = useState('cat');
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio value="cat" label="Cat" />
      <Radio value="dog" label="Dog" />
      <Radio value="fish" label="Fish" />
    </RadioGroup>
  );
}

function ControlledSwitch() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={() => setChecked(!checked)}
      label={checked ? 'On' : 'Off'}
    />
  );
}

function ControlledSlider() {
  const [value, setValue] = useState(50);
  return (
    <div className="space-y-s">
      <Slider
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => setValue(Number((e.target as HTMLInputElement).value))}
      />
      <span className="text-200 text-neutral-foreground-2">Value: {value}</span>
    </div>
  );
}

function ControlledSpinButton() {
  const [value, setValue] = useState(5);
  return <SpinButton value={value} onChange={setValue} min={0} max={20} step={1} />;
}

function ControlledDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="space-y-s">
      <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
      <span className="text-200 text-neutral-foreground-2">
        {date ? date.toLocaleDateString() : 'No date selected'}
      </span>
    </div>
  );
}

function ControlledTimePicker() {
  const [time, setTime] = useState<string | null>(null);
  return (
    <div className="space-y-s">
      <TimePicker value={time} onChange={setTime} placeholder="Pick a time" />
      <span className="text-200 text-neutral-foreground-2">
        {time ?? 'No time selected'}
      </span>
    </div>
  );
}

function ControlledColorPicker() {
  const [color, setColor] = useState('#0f6cbd');
  return (
    <div className="space-y-s">
      <ColorPicker
        value={color}
        onChange={setColor}
        presetColors={['#0f6cbd', '#d13438', '#107c10', '#ffaa44', '#5c2d91', '#008272']}
        showInput
      />
      <span className="text-200 text-neutral-foreground-2">Selected: {color}</span>
    </div>
  );
}

function ControlledCombobox() {
  const [value, setValue] = useState('');
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
  ];
  return <Combobox options={options} value={value} onChange={setValue} placeholder="Choose a framework" />;
}

function ControlledSegmented() {
  const [value, setValue] = useState('daily');
  return (
    <Segmented
      value={value}
      onChange={setValue}
      options={[
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
      ]}
    />
  );
}

function ControlledTagPicker() {
  const [selected, setSelected] = useState<string[]>(['react']);
  return (
    <TagPicker
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'solid', label: 'Solid' },
      ]}
      selectedValues={selected}
      onSelectionChange={setSelected}
      placeholder="Pick frameworks"
    />
  );
}

function ControlledRating() {
  const [value, setValue] = useState(3);
  return (
    <div className="space-y-s">
      <Rating value={value} onChange={setValue} />
      <span className="text-200 text-neutral-foreground-2">Rating: {value} / 5</span>
    </div>
  );
}

const transferData = [
  { key: '1', label: 'JavaScript' },
  { key: '2', label: 'TypeScript' },
  { key: '3', label: 'Python' },
  { key: '4', label: 'Rust' },
  { key: '5', label: 'Go' },
];

function ControlledTransfer() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2']);
  return (
    <Transfer
      dataSource={transferData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      titles={['Available', 'Selected']}
      showSearch
    />
  );
}

/* ── Demo registry ── */

export const formDemos: Record<string, ComponentPageProps> = {
  Input: {
    name: 'Input',
    description: 'A text input field that allows users to enter and edit text.',
    examples: [
      {
        title: 'Appearances',
        description: 'Input supports outline, underline, filled-darker, and filled-lighter appearances.',
        demo: (
          <div className="flex flex-col gap-s">
            <Input appearance="outline" placeholder="Outline (default)" />
            <Input appearance="underline" placeholder="Underline" />
            <Input appearance="filledDarker" placeholder="Filled darker" />
            <Input appearance="filledLighter" placeholder="Filled lighter" />
          </div>
        ),
        code: `<Input appearance="outline" placeholder="Outline (default)" />
<Input appearance="underline" placeholder="Underline" />
<Input appearance="filledDarker" placeholder="Filled darker" />
<Input appearance="filledLighter" placeholder="Filled lighter" />`,
      },
      {
        title: 'Sizes',
        description: 'Input comes in small, medium, and large sizes.',
        demo: (
          <div className="flex flex-col gap-s">
            <Input size="small" placeholder="Small" />
            <Input size="medium" placeholder="Medium (default)" />
            <Input size="large" placeholder="Large" />
          </div>
        ),
        code: `<Input size="small" placeholder="Small" />
<Input size="medium" placeholder="Medium (default)" />
<Input size="large" placeholder="Large" />`,
      },
      {
        title: 'Content before and after',
        description: 'Render icons or text inside the input before or after the text.',
        demo: (
          <div className="flex flex-col gap-s">
            <Input contentBefore={<span>$</span>} placeholder="Amount" />
            <Input contentAfter={<span>.00</span>} placeholder="Price" />
            <Input contentBefore={<span>@</span>} contentAfter={<span>.com</span>} placeholder="Email" />
          </div>
        ),
        code: `<Input contentBefore={<span>$</span>} placeholder="Amount" />
<Input contentAfter={<span>.00</span>} placeholder="Price" />
<Input contentBefore={<span>@</span>} contentAfter={<span>.com</span>} placeholder="Email" />`,
      },
      {
        title: 'Disabled',
        demo: <Input disabled placeholder="Disabled input" />,
        code: `<Input disabled placeholder="Disabled input" />`,
      },
    ],
  },

  Textarea: {
    name: 'Textarea',
    description: 'A multi-line text input for longer form content.',
    examples: [
      {
        title: 'Appearances',
        demo: (
          <div className="flex flex-col gap-s">
            <Textarea appearance="outline" placeholder="Outline" />
            <Textarea appearance="underline" placeholder="Underline" />
            <Textarea appearance="filledDarker" placeholder="Filled darker" />
          </div>
        ),
        code: `<Textarea appearance="outline" placeholder="Outline" />
<Textarea appearance="underline" placeholder="Underline" />
<Textarea appearance="filledDarker" placeholder="Filled darker" />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <Textarea size="small" placeholder="Small" />
            <Textarea size="medium" placeholder="Medium" />
            <Textarea size="large" placeholder="Large" />
          </div>
        ),
        code: `<Textarea size="small" placeholder="Small" />
<Textarea size="medium" placeholder="Medium" />
<Textarea size="large" placeholder="Large" />`,
      },
      {
        title: 'Resize options',
        description: 'Control whether the textarea can be resized.',
        demo: (
          <div className="flex flex-col gap-s">
            <Textarea resize="none" placeholder="No resize" />
            <Textarea resize="vertical" placeholder="Vertical only" />
            <Textarea resize="horizontal" placeholder="Horizontal only" />
            <Textarea resize="both" placeholder="Both directions" />
          </div>
        ),
        code: `<Textarea resize="none" placeholder="No resize" />
<Textarea resize="vertical" placeholder="Vertical only" />
<Textarea resize="horizontal" placeholder="Horizontal only" />
<Textarea resize="both" placeholder="Both directions" />`,
      },
      {
        title: 'Disabled',
        demo: <Textarea disabled placeholder="Disabled textarea" />,
        code: `<Textarea disabled placeholder="Disabled textarea" />`,
      },
    ],
  },

  Searchbox: {
    name: 'Searchbox',
    description: 'A search input with built-in search icon and dismiss button.',
    examples: [
      {
        title: 'Basic usage',
        demo: <Searchbox placeholder="Search..." />,
        code: `<Searchbox placeholder="Search..." />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <Searchbox size="small" placeholder="Small search" />
            <Searchbox size="medium" placeholder="Medium search" />
            <Searchbox size="large" placeholder="Large search" />
          </div>
        ),
        code: `<Searchbox size="small" placeholder="Small search" />
<Searchbox size="medium" placeholder="Medium search" />
<Searchbox size="large" placeholder="Large search" />`,
      },
      {
        title: 'Disabled',
        demo: <Searchbox disabled placeholder="Disabled search" />,
        code: `<Searchbox disabled placeholder="Disabled search" />`,
      },
    ],
  },

  Select: {
    name: 'Select',
    description: 'A native select dropdown for choosing from a list of options.',
    examples: [
      {
        title: 'Basic usage',
        demo: (
          <Select>
            <option value="">Choose a color...</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Select>
        ),
        code: `<Select>
  <option value="">Choose a color...</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Select>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <Select size="small">
              <option>Small</option>
            </Select>
            <Select size="medium">
              <option>Medium</option>
            </Select>
            <Select size="large">
              <option>Large</option>
            </Select>
          </div>
        ),
        code: `<Select size="small"><option>Small</option></Select>
<Select size="medium"><option>Medium</option></Select>
<Select size="large"><option>Large</option></Select>`,
      },
      {
        title: 'Appearances',
        demo: (
          <div className="flex flex-col gap-s">
            <Select appearance="outline"><option>Outline</option></Select>
            <Select appearance="underline"><option>Underline</option></Select>
            <Select appearance="filledDarker"><option>Filled darker</option></Select>
          </div>
        ),
        code: `<Select appearance="outline"><option>Outline</option></Select>
<Select appearance="underline"><option>Underline</option></Select>
<Select appearance="filledDarker"><option>Filled darker</option></Select>`,
      },
      {
        title: 'Disabled',
        demo: (
          <Select disabled>
            <option>Disabled</option>
          </Select>
        ),
        code: `<Select disabled><option>Disabled</option></Select>`,
      },
    ],
  },

  Combobox: {
    name: 'Combobox',
    description: 'An autocomplete input that filters and selects from a list of options.',
    examples: [
      {
        title: 'Basic usage',
        demo: (
          <Combobox
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'angular', label: 'Angular' },
            ]}
            placeholder="Pick a framework"
          />
        ),
        code: `<Combobox
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
  placeholder="Pick a framework"
/>`,
      },
      {
        title: 'Controlled with filtering',
        description: 'Use controlled state to track the selected value.',
        demo: <ControlledCombobox />,
        code: `const [value, setValue] = useState('');
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

<Combobox
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Choose a framework"
/>`,
      },
      {
        title: 'Disabled',
        demo: (
          <Combobox
            options={[{ value: 'react', label: 'React' }]}
            disabled
            placeholder="Disabled"
          />
        ),
        code: `<Combobox options={[{ value: 'react', label: 'React' }]} disabled placeholder="Disabled" />`,
      },
    ],
  },

  Checkbox: {
    name: 'Checkbox',
    description: 'A control that allows users to toggle between checked, unchecked, and mixed states.',
    examples: [
      {
        title: 'Controlled checkbox',
        demo: <ControlledCheckbox />,
        code: `const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={() => setChecked(!checked)}
  label="Accept terms and conditions"
/>`,
      },
      {
        title: 'Mixed (indeterminate) state',
        description: 'A parent checkbox shows mixed state when only some children are checked.',
        demo: <MixedCheckbox />,
        code: `const [items, setItems] = useState([true, false, true]);
const allChecked = items.every(Boolean);
const noneChecked = items.every((v) => !v);

<Checkbox
  checked={allChecked ? true : noneChecked ? false : undefined}
  onChange={() => setItems([!allChecked, !allChecked, !allChecked])}
  label="Select all"
/>
{['Apples', 'Bananas', 'Oranges'].map((fruit, i) => (
  <Checkbox
    key={fruit}
    checked={items[i]}
    onChange={() => { const next = [...items]; next[i] = !next[i]; setItems(next); }}
    label={fruit}
  />
))}`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex gap-m items-center">
            <Checkbox size="medium" label="Medium" defaultChecked />
            <Checkbox size="large" label="Large" defaultChecked />
          </div>
        ),
        code: `<Checkbox size="medium" label="Medium" defaultChecked />
<Checkbox size="large" label="Large" defaultChecked />`,
      },
      {
        title: 'Disabled',
        demo: (
          <div className="flex gap-m">
            <Checkbox disabled label="Disabled unchecked" />
            <Checkbox disabled defaultChecked label="Disabled checked" />
          </div>
        ),
        code: `<Checkbox disabled label="Disabled unchecked" />
<Checkbox disabled defaultChecked label="Disabled checked" />`,
      },
    ],
  },

  RadioGroup: {
    name: 'RadioGroup',
    description: 'A group of radio buttons allowing single selection from a set of options.',
    examples: [
      {
        title: 'Vertical layout (default)',
        demo: (
          <RadioGroup defaultValue="email">
            <Radio value="email" label="Email" />
            <Radio value="phone" label="Phone" />
            <Radio value="mail" label="Mail" />
          </RadioGroup>
        ),
        code: `<RadioGroup defaultValue="email">
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
  <Radio value="mail" label="Mail" />
</RadioGroup>`,
      },
      {
        title: 'Horizontal layout',
        demo: (
          <RadioGroup layout="horizontal" defaultValue="small">
            <Radio value="small" label="Small" />
            <Radio value="medium" label="Medium" />
            <Radio value="large" label="Large" />
          </RadioGroup>
        ),
        code: `<RadioGroup layout="horizontal" defaultValue="small">
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>`,
      },
      {
        title: 'Controlled',
        demo: <ControlledRadioGroup />,
        code: `const [value, setValue] = useState('cat');

<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="cat" label="Cat" />
  <Radio value="dog" label="Dog" />
  <Radio value="fish" label="Fish" />
</RadioGroup>`,
      },
      {
        title: 'Disabled',
        demo: (
          <RadioGroup disabled defaultValue="a">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        ),
        code: `<RadioGroup disabled defaultValue="a">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>`,
      },
    ],
  },

  Switch: {
    name: 'Switch',
    description: 'A toggle switch for binary on/off choices.',
    examples: [
      {
        title: 'Controlled switch',
        demo: <ControlledSwitch />,
        code: `const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onChange={() => setChecked(!checked)}
  label={checked ? 'On' : 'Off'}
/>`,
      },
      {
        title: 'Label positions',
        demo: (
          <div className="flex flex-col gap-m">
            <Switch label="Label after" labelPosition="after" defaultChecked />
            <Switch label="Label before" labelPosition="before" defaultChecked />
            <Switch label="Label above" labelPosition="above" defaultChecked />
          </div>
        ),
        code: `<Switch label="Label after" labelPosition="after" defaultChecked />
<Switch label="Label before" labelPosition="before" defaultChecked />
<Switch label="Label above" labelPosition="above" defaultChecked />`,
      },
      {
        title: 'Disabled',
        demo: (
          <div className="flex gap-m">
            <Switch disabled label="Off" />
            <Switch disabled defaultChecked label="On" />
          </div>
        ),
        code: `<Switch disabled label="Off" />
<Switch disabled defaultChecked label="On" />`,
      },
    ],
  },

  Slider: {
    name: 'Slider',
    description: 'A draggable slider for selecting a value from a continuous range.',
    examples: [
      {
        title: 'Controlled with value display',
        demo: <ControlledSlider />,
        code: `const [value, setValue] = useState(50);

<Slider
  min={0}
  max={100}
  step={1}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>
<span>Value: {value}</span>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-m">
            <Slider size="small" defaultValue={30} />
            <Slider size="medium" defaultValue={60} />
          </div>
        ),
        code: `<Slider size="small" defaultValue={30} />
<Slider size="medium" defaultValue={60} />`,
      },
      {
        title: 'With min, max, and step',
        demo: <Slider min={0} max={10} step={2} defaultValue={4} />,
        code: `<Slider min={0} max={10} step={2} defaultValue={4} />`,
      },
      {
        title: 'Disabled',
        demo: <Slider disabled defaultValue={50} />,
        code: `<Slider disabled defaultValue={50} />`,
      },
    ],
  },

  SpinButton: {
    name: 'SpinButton',
    description: 'A numeric input with increment and decrement buttons.',
    examples: [
      {
        title: 'Controlled',
        demo: <ControlledSpinButton />,
        code: `const [value, setValue] = useState(5);

<SpinButton value={value} onChange={setValue} min={0} max={20} step={1} />`,
      },
      {
        title: 'With min, max, and step',
        demo: <SpinButton defaultValue={0} min={0} max={100} step={5} />,
        code: `<SpinButton defaultValue={0} min={0} max={100} step={5} />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <SpinButton size="small" defaultValue={3} />
            <SpinButton size="medium" defaultValue={3} />
          </div>
        ),
        code: `<SpinButton size="small" defaultValue={3} />
<SpinButton size="medium" defaultValue={3} />`,
      },
    ],
  },

  DatePicker: {
    name: 'DatePicker',
    description: 'A date picker control for selecting calendar dates.',
    examples: [
      {
        title: 'Controlled with display',
        demo: <ControlledDatePicker />,
        code: `const [date, setDate] = useState<Date | null>(null);

<DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
<span>{date ? date.toLocaleDateString() : 'No date selected'}</span>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <DatePicker size="small" placeholder="Small" />
            <DatePicker size="medium" placeholder="Medium" />
            <DatePicker size="large" placeholder="Large" />
          </div>
        ),
        code: `<DatePicker size="small" placeholder="Small" />
<DatePicker size="medium" placeholder="Medium" />
<DatePicker size="large" placeholder="Large" />`,
      },
      {
        title: 'Disabled',
        demo: <DatePicker disabled placeholder="Disabled" />,
        code: `<DatePicker disabled placeholder="Disabled" />`,
      },
    ],
  },

  TimePicker: {
    name: 'TimePicker',
    description: 'A time picker control for selecting times from a dropdown.',
    examples: [
      {
        title: 'Controlled with display',
        demo: <ControlledTimePicker />,
        code: `const [time, setTime] = useState<string | null>(null);

<TimePicker value={time} onChange={setTime} placeholder="Pick a time" />
<span>{time ?? 'No time selected'}</span>`,
      },
      {
        title: '12-hour and 24-hour formats',
        demo: (
          <div className="flex flex-col gap-s">
            <TimePicker hour12 placeholder="12-hour format" />
            <TimePicker hour12={false} placeholder="24-hour format" />
          </div>
        ),
        code: `<TimePicker hour12 placeholder="12-hour format" />
<TimePicker hour12={false} placeholder="24-hour format" />`,
      },
      {
        title: 'Custom increment',
        description: 'Set the minute increment between time options.',
        demo: <TimePicker increment={15} placeholder="15 min increments" />,
        code: `<TimePicker increment={15} placeholder="15 min increments" />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <TimePicker size="small" placeholder="Small" />
            <TimePicker size="medium" placeholder="Medium" />
            <TimePicker size="large" placeholder="Large" />
          </div>
        ),
        code: `<TimePicker size="small" placeholder="Small" />
<TimePicker size="medium" placeholder="Medium" />
<TimePicker size="large" placeholder="Large" />`,
      },
    ],
  },

  ColorPicker: {
    name: 'ColorPicker',
    description: 'A color picker with preset swatches and optional hex input.',
    examples: [
      {
        title: 'With preset colors and hex input',
        demo: <ControlledColorPicker />,
        code: `const [color, setColor] = useState('#0f6cbd');

<ColorPicker
  value={color}
  onChange={setColor}
  presetColors={['#0f6cbd', '#d13438', '#107c10', '#ffaa44', '#5c2d91', '#008272']}
  showInput
/>
<span>Selected: {color}</span>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-m">
            <ColorPicker size="small" defaultValue="#0f6cbd" presetColors={['#0f6cbd', '#d13438', '#107c10']} />
            <ColorPicker size="medium" defaultValue="#d13438" presetColors={['#0f6cbd', '#d13438', '#107c10']} />
            <ColorPicker size="large" defaultValue="#107c10" presetColors={['#0f6cbd', '#d13438', '#107c10']} />
          </div>
        ),
        code: `<ColorPicker size="small" defaultValue="#0f6cbd" presetColors={['#0f6cbd', '#d13438', '#107c10']} />
<ColorPicker size="medium" defaultValue="#d13438" presetColors={['#0f6cbd', '#d13438', '#107c10']} />
<ColorPicker size="large" defaultValue="#107c10" presetColors={['#0f6cbd', '#d13438', '#107c10']} />`,
      },
      {
        title: 'Disabled',
        demo: <ColorPicker disabled defaultValue="#0f6cbd" presetColors={['#0f6cbd', '#d13438']} />,
        code: `<ColorPicker disabled defaultValue="#0f6cbd" presetColors={['#0f6cbd', '#d13438']} />`,
      },
    ],
  },

  Upload: {
    name: 'Upload',
    description: 'A file upload control supporting button and drag-and-drop modes.',
    examples: [
      {
        title: 'Button mode',
        demo: <Upload appearance="button" accept="image/*,.pdf" multiple>Click to upload</Upload>,
        code: `<Upload appearance="button" accept="image/*,.pdf" multiple>
  Click to upload
</Upload>`,
      },
      {
        title: 'Dragger mode',
        description: 'A large drop zone for dragging and dropping files.',
        demo: (
          <Upload appearance="dragger" accept="image/*" multiple>
            Drag files here or click to browse
          </Upload>
        ),
        code: `<Upload appearance="dragger" accept="image/*" multiple>
  Drag files here or click to browse
</Upload>`,
      },
      {
        title: 'Disabled',
        demo: <Upload appearance="button" disabled>Upload disabled</Upload>,
        code: `<Upload appearance="button" disabled>Upload disabled</Upload>`,
      },
    ],
  },

  Transfer: {
    name: 'Transfer',
    description: 'A dual-list transfer component for moving items between two columns.',
    examples: [
      {
        title: 'Basic with search',
        demo: <ControlledTransfer />,
        code: `const transferData = [
  { key: '1', label: 'JavaScript' },
  { key: '2', label: 'TypeScript' },
  { key: '3', label: 'Python' },
  { key: '4', label: 'Rust' },
  { key: '5', label: 'Go' },
];

const [targetKeys, setTargetKeys] = useState(['2']);

<Transfer
  dataSource={transferData}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={['Available', 'Selected']}
  showSearch
/>`,
      },
      {
        title: 'Disabled',
        demo: (
          <Transfer
            dataSource={transferData}
            defaultTargetKeys={['1']}
            titles={['Source', 'Target']}
            disabled
          />
        ),
        code: `<Transfer
  dataSource={transferData}
  defaultTargetKeys={['1']}
  titles={['Source', 'Target']}
  disabled
/>`,
      },
    ],
  },

  Field: {
    name: 'Field',
    description: 'A wrapper that adds label, validation, and hint text to form controls.',
    examples: [
      {
        title: 'With label and hint',
        demo: (
          <Field label="Email address" hint="We will never share your email.">
            <Input placeholder="name@example.com" />
          </Field>
        ),
        code: `<Field label="Email address" hint="We will never share your email.">
  <Input placeholder="name@example.com" />
</Field>`,
      },
      {
        title: 'Required field',
        demo: (
          <Field label="Full name" required>
            <Input placeholder="Enter your name" />
          </Field>
        ),
        code: `<Field label="Full name" required>
  <Input placeholder="Enter your name" />
</Field>`,
      },
      {
        title: 'Validation states',
        description: 'Display success, warning, or error messages below the control.',
        demo: (
          <div className="flex flex-col gap-m">
            <Field label="Username" validationState="success" validationMessage="Username is available.">
              <Input defaultValue="fluentwind" />
            </Field>
            <Field label="Password" validationState="warning" validationMessage="Password is weak.">
              <Input type="password" defaultValue="123" />
            </Field>
            <Field label="Email" validationState="error" validationMessage="Please enter a valid email.">
              <Input defaultValue="not-an-email" />
            </Field>
          </div>
        ),
        code: `<Field label="Username" validationState="success" validationMessage="Username is available.">
  <Input defaultValue="fluentwind" />
</Field>
<Field label="Password" validationState="warning" validationMessage="Password is weak.">
  <Input type="password" defaultValue="123" />
</Field>
<Field label="Email" validationState="error" validationMessage="Please enter a valid email.">
  <Input defaultValue="not-an-email" />
</Field>`,
      },
      {
        title: 'Horizontal orientation',
        demo: (
          <Field label="Company" orientation="horizontal">
            <Input placeholder="Contoso Ltd." />
          </Field>
        ),
        code: `<Field label="Company" orientation="horizontal">
  <Input placeholder="Contoso Ltd." />
</Field>`,
      },
    ],
  },

  Segmented: {
    name: 'Segmented',
    description: 'A segmented control for switching between related views or options.',
    examples: [
      {
        title: 'Basic usage',
        demo: <ControlledSegmented />,
        code: `const [value, setValue] = useState('daily');

<Segmented
  value={value}
  onChange={setValue}
  options={[
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ]}
/>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-m">
            <Segmented size="small" defaultValue="a" options={[{ value: 'a', label: 'Small A' }, { value: 'b', label: 'Small B' }]} />
            <Segmented size="medium" defaultValue="a" options={[{ value: 'a', label: 'Medium A' }, { value: 'b', label: 'Medium B' }]} />
            <Segmented size="large" defaultValue="a" options={[{ value: 'a', label: 'Large A' }, { value: 'b', label: 'Large B' }]} />
          </div>
        ),
        code: `<Segmented size="small" defaultValue="a" options={[{ value: 'a', label: 'Small A' }, { value: 'b', label: 'Small B' }]} />
<Segmented size="medium" defaultValue="a" options={[{ value: 'a', label: 'Medium A' }, { value: 'b', label: 'Medium B' }]} />
<Segmented size="large" defaultValue="a" options={[{ value: 'a', label: 'Large A' }, { value: 'b', label: 'Large B' }]} />`,
      },
      {
        title: 'Block mode',
        description: 'Stretch the segmented control to fill the container width.',
        demo: (
          <Segmented
            block
            defaultValue="list"
            options={[
              { value: 'list', label: 'List' },
              { value: 'grid', label: 'Grid' },
              { value: 'kanban', label: 'Kanban' },
            ]}
          />
        ),
        code: `<Segmented
  block
  defaultValue="list"
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'kanban', label: 'Kanban' },
  ]}
/>`,
      },
      {
        title: 'Disabled',
        demo: (
          <Segmented
            disabled
            defaultValue="a"
            options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
          />
        ),
        code: `<Segmented disabled defaultValue="a" options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} />`,
      },
    ],
  },

  TagPicker: {
    name: 'TagPicker',
    description: 'A multi-select input that displays selected items as tags.',
    examples: [
      {
        title: 'Controlled tag picker',
        demo: <ControlledTagPicker />,
        code: `const [selected, setSelected] = useState(['react']);

<TagPicker
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
  ]}
  selectedValues={selected}
  onSelectionChange={setSelected}
  placeholder="Pick frameworks"
/>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-s">
            <TagPicker
              size="medium"
              options={[{ value: 'a', label: 'Medium' }]}
              defaultSelectedValues={['a']}
            />
            <TagPicker
              size="large"
              options={[{ value: 'a', label: 'Large' }]}
              defaultSelectedValues={['a']}
            />
          </div>
        ),
        code: `<TagPicker size="medium" options={[{ value: 'a', label: 'Medium' }]} defaultSelectedValues={['a']} />
<TagPicker size="large" options={[{ value: 'a', label: 'Large' }]} defaultSelectedValues={['a']} />`,
      },
      {
        title: 'Disabled',
        demo: (
          <TagPicker
            disabled
            options={[{ value: 'react', label: 'React' }]}
            defaultSelectedValues={['react']}
          />
        ),
        code: `<TagPicker disabled options={[{ value: 'react', label: 'React' }]} defaultSelectedValues={['react']} />`,
      },
    ],
  },

  Rating: {
    name: 'Rating',
    description: 'A star rating control for collecting user feedback.',
    examples: [
      {
        title: 'Controlled rating',
        demo: <ControlledRating />,
        code: `const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} />
<span>Rating: {value} / 5</span>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-m">
            <Rating size="small" defaultValue={3} />
            <Rating size="medium" defaultValue={3} />
            <Rating size="large" defaultValue={3} />
            <Rating size="extraLarge" defaultValue={3} />
          </div>
        ),
        code: `<Rating size="small" defaultValue={3} />
<Rating size="medium" defaultValue={3} />
<Rating size="large" defaultValue={3} />
<Rating size="extraLarge" defaultValue={3} />`,
      },
      {
        title: 'Colors',
        demo: (
          <div className="flex flex-col gap-m">
            <Rating color="brand" defaultValue={4} />
            <Rating color="marigold" defaultValue={4} />
            <Rating color="neutral" defaultValue={4} />
          </div>
        ),
        code: `<Rating color="brand" defaultValue={4} />
<Rating color="marigold" defaultValue={4} />
<Rating color="neutral" defaultValue={4} />`,
      },
      {
        title: 'Read-only',
        demo: <Rating readOnly value={4} />,
        code: `<Rating readOnly value={4} />`,
      },
    ],
  },
};
