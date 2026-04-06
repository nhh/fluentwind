import { useState, useRef } from 'react';
import {
  AspectRatio,
  PasswordInput,
  Descriptions,
  DescriptionsItem,
  QRCode,
  ToggleGroup,
  ToggleGroupItem,
  PinInput,
  ScrollArea,
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  HoverCard,
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarDivider,
  Mentions,
  Tour,
  Calendar,
  Cascader,
  TreeSelect,
  Splitter,
  SplitterPanel,
  SplitterResizeHandle,
  Form,
  FormField,
  useForm,
  NotificationProvider,
  useNotification,
  Button,
  Text,
  Link,
  Avatar,
  Input,
} from '@fluentwind/react';
import type { TourStep } from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Interactive helpers ── */

function PasswordInputDemo() {
  const [value, setValue] = useState('');
  return <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter password" />;
}

function ToggleGroupSingleDemo() {
  const [value, setValue] = useState<string | string[]>('bold');
  return (
    <ToggleGroup type="single" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  );
}

function ToggleGroupMultipleDemo() {
  const [value, setValue] = useState<string | string[]>(['bold']);
  return (
    <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  );
}

function PinInputDemo() {
  const [value, setValue] = useState('');
  return <PinInput length={4} value={value} onChange={setValue} />;
}

function PinInputMaskedDemo() {
  const [value, setValue] = useState('');
  return <PinInput length={6} mask value={value} onChange={setValue} />;
}

function MentionsDemo() {
  const [value, setValue] = useState('');
  const options = [
    { label: 'Alice Johnson', value: 'alice' },
    { label: 'Bob Smith', value: 'bob' },
    { label: 'Carol Williams', value: 'carol' },
    { label: 'David Brown', value: 'david' },
    { label: 'Eve Davis', value: 'eve' },
    { label: 'Frank Miller', value: 'frank' },
  ];
  return (
    <Mentions
      value={value}
      onChange={(val) => setValue(val)}
      options={options}
      placeholder="Type @ to mention someone"
    />
  );
}

function TourDemo() {
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const steps: TourStep[] = [
    { target: ref1, title: 'Welcome', description: 'Click here to begin the guided tour.' },
    { target: ref2, title: 'Features', description: 'This area showcases the main features.' },
    { target: ref3, title: 'Summary', description: 'Review your progress and wrap up here.' },
  ];

  return (
    <div className="space-y-m">
      <Button ref={ref1} onClick={() => setOpen(true)}>Start Tour</Button>
      <div ref={ref2} className="p-m border border-neutral-stroke-2 rounded-m">
        Step 2 target: Feature area
      </div>
      <div ref={ref3} className="p-m border border-neutral-stroke-2 rounded-m">
        Step 3 target: Summary area
      </div>
      <Tour steps={steps} open={open} onOpenChange={setOpen} />
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return <Calendar value={date} onChange={setDate} />;
}

function CalendarCustomRenderDemo() {
  const specialDates = [5, 12, 20];
  return (
    <Calendar
      dateCellRender={(day) => {
        const isSpecial = specialDates.includes(day.getDate());
        return isSpecial ? (
          <div className="relative flex items-center justify-center">
            {day.getDate()}
            <span className="absolute bottom-0 w-[4px] h-[4px] rounded-full bg-brand-primary" />
          </div>
        ) : (
          <>{day.getDate()}</>
        );
      }}
    />
  );
}

const cascaderOptions = [
  {
    label: 'United States',
    value: 'us',
    children: [
      {
        label: 'California',
        value: 'ca',
        children: [
          { label: 'San Francisco', value: 'sf' },
          { label: 'Los Angeles', value: 'la' },
        ],
      },
      {
        label: 'New York',
        value: 'ny',
        children: [
          { label: 'New York City', value: 'nyc' },
          { label: 'Buffalo', value: 'buf' },
        ],
      },
    ],
  },
  {
    label: 'Canada',
    value: 'ca-country',
    children: [
      {
        label: 'Ontario',
        value: 'on',
        children: [
          { label: 'Toronto', value: 'tor' },
          { label: 'Ottawa', value: 'ott' },
        ],
      },
    ],
  },
];

function CascaderDemo() {
  const [value, setValue] = useState<string[]>([]);
  return <Cascader options={cascaderOptions} value={value} onChange={setValue} placeholder="Select location" />;
}

const treeData = [
  {
    label: 'Engineering',
    key: 'eng',
    children: [
      { label: 'Frontend', key: 'fe' },
      { label: 'Backend', key: 'be' },
    ],
  },
  {
    label: 'Design',
    key: 'design',
    children: [
      { label: 'UX', key: 'ux' },
      { label: 'Visual', key: 'visual' },
    ],
  },
];

function TreeSelectSingleDemo() {
  const [value, setValue] = useState<string | string[]>('');
  return <TreeSelect treeData={treeData} value={value} onChange={setValue} placeholder="Select department" />;
}

function TreeSelectMultipleDemo() {
  const [value, setValue] = useState<string | string[]>([]);
  return <TreeSelect treeData={treeData} value={value} onChange={setValue} multiple placeholder="Select departments" />;
}

function FormDemo() {
  const [submitted, setSubmitted] = useState<{ email: string; password: string } | null>(null);
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: (values) => setSubmitted(values as { email: string; password: string }),
  });

  return (
    <Form
      form={form}
      className="space-y-m max-w-[360px]"
    >
      <FormField
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Email is required' },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
        ]}
      >
        <Input placeholder="you@example.com" {...form.getFieldProps('email')} />
      </FormField>
      <FormField
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Password is required' },
          { minLength: 8, message: 'Min 8 characters' },
        ]}
      >
        <PasswordInput placeholder="Enter password" {...form.getFieldProps('password')} />
      </FormField>
      <Button type="submit" appearance="primary">Log in</Button>
      {submitted && (
        <Text variant="body1" className="text-success-foreground-1" block>
          Submitted: {submitted.email}
        </Text>
      )}
    </Form>
  );
}

function NotificationDemo() {
  const { notify } = useNotification();
  return (
    <div className="flex gap-s flex-wrap">
      <Button onClick={() => notify({ title: 'Info', description: 'This is an informational message.', intent: 'info' })}>
        Info
      </Button>
      <Button onClick={() => notify({ title: 'Success', description: 'Operation completed successfully.', intent: 'success' })}>
        Success
      </Button>
      <Button onClick={() => notify({ title: 'Warning', description: 'Please review before continuing.', intent: 'warning' })}>
        Warning
      </Button>
      <Button onClick={() => notify({ title: 'Error', description: 'Something went wrong.', intent: 'error' })}>
        Error
      </Button>
    </div>
  );
}

function NotificationDemoWrapper() {
  return (
    <NotificationProvider>
      <NotificationDemo />
    </NotificationProvider>
  );
}

/* ── Demo registry ── */

export const newComponentDemos: Record<string, ComponentPageProps> = {
  AspectRatio: {
    name: 'AspectRatio',
    description: 'AspectRatio constrains its child to a specified width-to-height ratio.',
    examples: [
      {
        title: 'Common Ratios',
        description: 'Display content in 16:9, 4:3, and 1:1 aspect ratios.',
        demo: (
          <div className="flex gap-m flex-wrap">
            <div className="w-[240px]">
              <Text variant="caption1" block>16:9</Text>
              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-brand-primary rounded-m flex items-center justify-center text-white">
                  16:9
                </div>
              </AspectRatio>
            </div>
            <div className="w-[200px]">
              <Text variant="caption1" block>4:3</Text>
              <AspectRatio ratio={4 / 3}>
                <div className="w-full h-full bg-brand-primary rounded-m flex items-center justify-center text-white">
                  4:3
                </div>
              </AspectRatio>
            </div>
            <div className="w-[160px]">
              <Text variant="caption1" block>1:1</Text>
              <AspectRatio ratio={1}>
                <div className="w-full h-full bg-brand-primary rounded-m flex items-center justify-center text-white">
                  1:1
                </div>
              </AspectRatio>
            </div>
          </div>
        ),
        code: `<AspectRatio ratio={16 / 9}>
  <div className="w-full h-full bg-brand-primary">16:9</div>
</AspectRatio>

<AspectRatio ratio={4 / 3}>
  <div className="w-full h-full bg-brand-primary">4:3</div>
</AspectRatio>

<AspectRatio ratio={1}>
  <div className="w-full h-full bg-brand-primary">1:1</div>
</AspectRatio>`,
      },
    ],
  },

  PasswordInput: {
    name: 'PasswordInput',
    description: 'A text input that masks its value and provides a visibility toggle.',
    examples: [
      {
        title: 'Default',
        description: 'Password input with a toggle to reveal the value.',
        demo: <PasswordInputDemo />,
        code: `const [value, setValue] = useState('');
<PasswordInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter password" />`,
      },
      {
        title: 'Sizes',
        description: 'PasswordInput supports small, medium, and large sizes.',
        demo: (
          <div className="flex flex-col gap-s max-w-[320px]">
            <PasswordInput size="small" placeholder="Small" />
            <PasswordInput size="medium" placeholder="Medium" />
            <PasswordInput size="large" placeholder="Large" />
          </div>
        ),
        code: `<PasswordInput size="small" placeholder="Small" />
<PasswordInput size="medium" placeholder="Medium" />
<PasswordInput size="large" placeholder="Large" />`,
      },
      {
        title: 'Disabled',
        demo: <PasswordInput disabled placeholder="Disabled" />,
        code: `<PasswordInput disabled placeholder="Disabled" />`,
      },
    ],
  },

  Descriptions: {
    name: 'Descriptions',
    description: 'Descriptions displays a list of label-value pairs in a structured layout.',
    examples: [
      {
        title: 'Horizontal Layout',
        description: 'A 3-column horizontal description list.',
        demo: (
          <Descriptions column={3} layout="horizontal">
            <DescriptionsItem label="Name">Jane Doe</DescriptionsItem>
            <DescriptionsItem label="Phone">+1 (555) 123-4567</DescriptionsItem>
            <DescriptionsItem label="Email">jane@example.com</DescriptionsItem>
            <DescriptionsItem label="Address">123 Main St, Anytown</DescriptionsItem>
            <DescriptionsItem label="Role">Administrator</DescriptionsItem>
            <DescriptionsItem label="Status">Active</DescriptionsItem>
          </Descriptions>
        ),
        code: `<Descriptions column={3} layout="horizontal">
  <DescriptionsItem label="Name">Jane Doe</DescriptionsItem>
  <DescriptionsItem label="Phone">+1 (555) 123-4567</DescriptionsItem>
  <DescriptionsItem label="Email">jane@example.com</DescriptionsItem>
  <DescriptionsItem label="Address">123 Main St, Anytown</DescriptionsItem>
  <DescriptionsItem label="Role">Administrator</DescriptionsItem>
  <DescriptionsItem label="Status">Active</DescriptionsItem>
</Descriptions>`,
      },
      {
        title: 'Bordered',
        description: 'Description list with borders for a structured table look.',
        demo: (
          <Descriptions column={3} layout="horizontal" bordered>
            <DescriptionsItem label="Name">Jane Doe</DescriptionsItem>
            <DescriptionsItem label="Phone">+1 (555) 123-4567</DescriptionsItem>
            <DescriptionsItem label="Email">jane@example.com</DescriptionsItem>
            <DescriptionsItem label="Address">123 Main St, Anytown</DescriptionsItem>
            <DescriptionsItem label="Role">Administrator</DescriptionsItem>
            <DescriptionsItem label="Status">Active</DescriptionsItem>
          </Descriptions>
        ),
        code: `<Descriptions column={3} layout="horizontal" bordered>
  <DescriptionsItem label="Name">Jane Doe</DescriptionsItem>
  <DescriptionsItem label="Phone">+1 (555) 123-4567</DescriptionsItem>
  ...
</Descriptions>`,
      },
    ],
  },

  QRCode: {
    name: 'QRCode',
    description: 'QRCode generates a scannable QR code image from a string value.',
    examples: [
      {
        title: 'Basic',
        demo: <QRCode value="https://fluentwind.dev" />,
        code: `<QRCode value="https://fluentwind.dev" />`,
      },
      {
        title: 'Sizes',
        description: 'QR codes can be rendered at different sizes.',
        demo: (
          <div className="flex gap-m items-end">
            <QRCode value="https://fluentwind.dev" size={80} />
            <QRCode value="https://fluentwind.dev" size={128} />
            <QRCode value="https://fluentwind.dev" size={200} />
          </div>
        ),
        code: `<QRCode value="https://fluentwind.dev" size={80} />
<QRCode value="https://fluentwind.dev" size={128} />
<QRCode value="https://fluentwind.dev" size={200} />`,
      },
      {
        title: 'Error Correction Levels',
        description: 'Different error correction levels control redundancy.',
        demo: (
          <div className="flex gap-m items-end">
            <div className="text-center">
              <QRCode value="https://fluentwind.dev" level="L" size={100} />
              <Text variant="caption1" block>Low</Text>
            </div>
            <div className="text-center">
              <QRCode value="https://fluentwind.dev" level="M" size={100} />
              <Text variant="caption1" block>Medium</Text>
            </div>
            <div className="text-center">
              <QRCode value="https://fluentwind.dev" level="H" size={100} />
              <Text variant="caption1" block>High</Text>
            </div>
          </div>
        ),
        code: `<QRCode value="https://fluentwind.dev" level="L" />
<QRCode value="https://fluentwind.dev" level="M" />
<QRCode value="https://fluentwind.dev" level="H" />`,
      },
    ],
  },

  ToggleGroup: {
    name: 'ToggleGroup',
    description: 'A set of two-state buttons that can be toggled on or off, supporting single or multiple selection.',
    examples: [
      {
        title: 'Single Select',
        description: 'Only one item can be active at a time.',
        demo: <ToggleGroupSingleDemo />,
        code: `const [value, setValue] = useState('bold');
<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`,
      },
      {
        title: 'Multiple Select',
        description: 'Multiple items can be active simultaneously.',
        demo: <ToggleGroupMultipleDemo />,
        code: `const [value, setValue] = useState(['bold']);
<ToggleGroup type="multiple" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`,
      },
      {
        title: 'Sizes & Appearances',
        demo: (
          <div className="flex flex-col gap-m">
            <ToggleGroup type="single" size="small">
              <ToggleGroupItem value="a">Small A</ToggleGroupItem>
              <ToggleGroupItem value="b">Small B</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="large">
              <ToggleGroupItem value="a">Large A</ToggleGroupItem>
              <ToggleGroupItem value="b">Large B</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" appearance="subtle">
              <ToggleGroupItem value="a">Subtle A</ToggleGroupItem>
              <ToggleGroupItem value="b">Subtle B</ToggleGroupItem>
            </ToggleGroup>
          </div>
        ),
        code: `<ToggleGroup type="single" size="small">...</ToggleGroup>
<ToggleGroup type="single" size="large">...</ToggleGroup>
<ToggleGroup type="single" appearance="subtle">...</ToggleGroup>`,
      },
    ],
  },

  PinInput: {
    name: 'PinInput',
    description: 'PinInput provides a set of individual character inputs for entering PINs or verification codes.',
    examples: [
      {
        title: '4-Digit Default',
        demo: <PinInputDemo />,
        code: `const [value, setValue] = useState('');
<PinInput length={4} value={value} onChange={setValue} />`,
      },
      {
        title: '6-Digit Masked',
        description: 'Characters are hidden as they are entered.',
        demo: <PinInputMaskedDemo />,
        code: `<PinInput length={6} mask value={value} onChange={setValue} />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex flex-col gap-m">
            <PinInput length={4} size="small" />
            <PinInput length={4} size="medium" />
            <PinInput length={4} size="large" />
          </div>
        ),
        code: `<PinInput length={4} size="small" />
<PinInput length={4} size="medium" />
<PinInput length={4} size="large" />`,
      },
    ],
  },

  ScrollArea: {
    name: 'ScrollArea',
    description: 'ScrollArea provides a styled scrollable container with custom scrollbar appearance.',
    examples: [
      {
        title: 'Vertical Scroll',
        description: 'A fixed-height container with vertically scrollable content.',
        demo: (
          <ScrollArea className="h-[200px] w-[280px] rounded-m border border-neutral-stroke-2 p-m">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="py-xs border-b border-neutral-stroke-2 text-300">
                Item {i + 1}
              </div>
            ))}
          </ScrollArea>
        ),
        code: `<ScrollArea className="h-[200px] w-[280px] rounded-m border p-m">
  {Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="py-xs border-b">Item {i + 1}</div>
  ))}
</ScrollArea>`,
      },
      {
        title: 'Hover Type',
        description: 'Scrollbar only appears on hover.',
        demo: (
          <ScrollArea type="hover" className="h-[200px] w-[280px] rounded-m border border-neutral-stroke-2 p-m">
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} className="py-xs border-b border-neutral-stroke-2 text-300">
                Hover item {i + 1}
              </div>
            ))}
          </ScrollArea>
        ),
        code: `<ScrollArea type="hover" className="h-[200px] w-[280px]">
  {Array.from({ length: 25 }, (_, i) => (
    <div key={i}>Hover item {i + 1}</div>
  ))}
</ScrollArea>`,
      },
    ],
  },

  ContextMenu: {
    name: 'ContextMenu',
    description: 'ContextMenu shows a menu on right-click with actions and keyboard shortcuts.',
    examples: [
      {
        title: 'Right-Click Menu',
        description: 'Right-click the area below to open the context menu.',
        demo: (
          <ContextMenu
            content={
              <>
                <ContextMenuItem shortcut="Ctrl+X">Cut</ContextMenuItem>
                <ContextMenuItem shortcut="Ctrl+C">Copy</ContextMenuItem>
                <ContextMenuItem shortcut="Ctrl+V">Paste</ContextMenuItem>
              </>
            }
          >
            <div className="flex items-center justify-center h-[150px] w-full border-2 border-dashed border-neutral-stroke-2 rounded-m text-neutral-foreground-2">
              Right-click here
            </div>
          </ContextMenu>
        ),
        code: `<ContextMenu
  content={
    <>
      <ContextMenuItem shortcut="Ctrl+X">Cut</ContextMenuItem>
      <ContextMenuItem shortcut="Ctrl+C">Copy</ContextMenuItem>
      <ContextMenuItem shortcut="Ctrl+V">Paste</ContextMenuItem>
    </>
  }
>
  <div>Right-click here</div>
</ContextMenu>`,
      },
    ],
  },

  HoverCard: {
    name: 'HoverCard',
    description: 'HoverCard displays rich content in a floating card when hovering over a trigger element.',
    examples: [
      {
        title: 'User Profile Card',
        description: 'Hover over the link to see a user card.',
        demo: (
          <HoverCard
            content={
              <div className="flex gap-m">
                <Avatar name="Jane Doe" size={48} />
                <div className="space-y-xs">
                  <Text variant="body1Strong" block>Jane Doe</Text>
                  <Text variant="caption1" block>Software Engineer at FluentWind</Text>
                  <Text variant="caption1" className="text-neutral-foreground-3" block>Joined March 2024</Text>
                </div>
              </div>
            }
          >
            <Link href="#">@janedoe</Link>
          </HoverCard>
        ),
        code: `<HoverCard
  content={
    <div className="flex gap-m">
      <Avatar name="Jane Doe" size={48} />
      <div>
        <Text variant="body1Strong">Jane Doe</Text>
        <Text variant="caption1">Software Engineer</Text>
      </div>
    </div>
  }
>
  <Link href="#">@janedoe</Link>
</HoverCard>`,
      },
    ],
  },

  Menubar: {
    name: 'Menubar',
    description: 'Menubar provides a horizontal menu bar with dropdown menus, commonly used for application menus.',
    examples: [
      {
        title: 'Application Menu',
        description: 'A menu bar with File, Edit, and View menus.',
        demo: (
          <Menubar>
            <MenubarMenu trigger="File">
              <MenubarItem shortcut="Ctrl+N">New File</MenubarItem>
              <MenubarItem shortcut="Ctrl+O">Open</MenubarItem>
              <MenubarItem shortcut="Ctrl+S">Save</MenubarItem>
              <MenubarDivider />
              <MenubarItem shortcut="Ctrl+Q">Exit</MenubarItem>
            </MenubarMenu>
            <MenubarMenu trigger="Edit">
              <MenubarItem shortcut="Ctrl+Z">Undo</MenubarItem>
              <MenubarItem shortcut="Ctrl+Y">Redo</MenubarItem>
              <MenubarDivider />
              <MenubarItem shortcut="Ctrl+X">Cut</MenubarItem>
              <MenubarItem shortcut="Ctrl+C">Copy</MenubarItem>
              <MenubarItem shortcut="Ctrl+V">Paste</MenubarItem>
            </MenubarMenu>
            <MenubarMenu trigger="View">
              <MenubarItem>Zoom In</MenubarItem>
              <MenubarItem>Zoom Out</MenubarItem>
              <MenubarDivider />
              <MenubarItem>Toggle Sidebar</MenubarItem>
            </MenubarMenu>
          </Menubar>
        ),
        code: `<Menubar>
  <MenubarMenu trigger="File">
    <MenubarItem shortcut="Ctrl+N">New File</MenubarItem>
    <MenubarItem shortcut="Ctrl+O">Open</MenubarItem>
    <MenubarItem shortcut="Ctrl+S">Save</MenubarItem>
    <MenubarDivider />
    <MenubarItem shortcut="Ctrl+Q">Exit</MenubarItem>
  </MenubarMenu>
  <MenubarMenu trigger="Edit">
    <MenubarItem shortcut="Ctrl+Z">Undo</MenubarItem>
    <MenubarItem shortcut="Ctrl+Y">Redo</MenubarItem>
    ...
  </MenubarMenu>
</Menubar>`,
      },
    ],
  },

  Mentions: {
    name: 'Mentions',
    description: 'Mentions provides a textarea with @mention autocomplete for referencing people or entities.',
    examples: [
      {
        title: '@Mention People',
        description: 'Type @ to see a list of suggested people.',
        demo: <MentionsDemo />,
        code: `const options = [
  { label: 'Alice Johnson', value: 'alice' },
  { label: 'Bob Smith', value: 'bob' },
  { label: 'Carol Williams', value: 'carol' },
  { label: 'David Brown', value: 'david' },
  { label: 'Eve Davis', value: 'eve' },
  { label: 'Frank Miller', value: 'frank' },
];
<Mentions
  value={value}
  onChange={(val) => setValue(val)}
  options={options}
  placeholder="Type @ to mention someone"
/>`,
      },
    ],
  },

  Tour: {
    name: 'Tour',
    description: 'Tour guides users through a sequence of highlighted UI elements with step-by-step instructions.',
    examples: [
      {
        title: '3-Step Tour',
        description: 'Click "Start Tour" to walk through the steps.',
        demo: <TourDemo />,
        code: `const ref1 = useRef(null);
const ref2 = useRef(null);
const ref3 = useRef(null);
const [open, setOpen] = useState(false);

const steps: TourStep[] = [
  { target: ref1, title: 'Welcome', description: 'Click here to begin.' },
  { target: ref2, title: 'Features', description: 'Main features here.' },
  { target: ref3, title: 'Summary', description: 'Wrap up here.' },
];

<Button ref={ref1} onClick={() => setOpen(true)}>Start Tour</Button>
<div ref={ref2}>Feature area</div>
<div ref={ref3}>Summary area</div>
<Tour steps={steps} open={open} onOpenChange={setOpen} />`,
      },
    ],
  },

  Calendar: {
    name: 'Calendar',
    description: 'Calendar displays a monthly calendar for date viewing and selection.',
    examples: [
      {
        title: 'Default',
        demo: <CalendarDemo />,
        code: `const [date, setDate] = useState<Date | null>(null);
<Calendar value={date} onChange={setDate} />`,
      },
      {
        title: 'Custom Date Cell Render',
        description: 'Render dots on specific dates (5th, 12th, 20th) using dateCellRender.',
        demo: <CalendarCustomRenderDemo />,
        code: `const specialDates = [5, 12, 20];
<Calendar
  dateCellRender={(day) => {
    const isSpecial = specialDates.includes(day.getDate());
    return isSpecial ? (
      <div className="relative flex items-center justify-center">
        {day.getDate()}
        <span className="absolute bottom-0 w-[4px] h-[4px] rounded-full bg-brand-primary" />
      </div>
    ) : <>{day.getDate()}</>;
  }}
/>`,
      },
    ],
  },

  Cascader: {
    name: 'Cascader',
    description: 'Cascader selects from a hierarchical set of options, displaying each level in a cascading panel.',
    examples: [
      {
        title: 'Location Selector',
        description: 'Select Country, then State, then City.',
        demo: <CascaderDemo />,
        code: `const options = [
  { label: 'United States', value: 'us', children: [
    { label: 'California', value: 'ca', children: [
      { label: 'San Francisco', value: 'sf' },
      { label: 'Los Angeles', value: 'la' },
    ]},
    { label: 'New York', value: 'ny', children: [
      { label: 'New York City', value: 'nyc' },
      { label: 'Buffalo', value: 'buf' },
    ]},
  ]},
  { label: 'Canada', value: 'ca-country', children: [...] },
];
<Cascader options={options} value={value} onChange={setValue} placeholder="Select location" />`,
      },
    ],
  },

  TreeSelect: {
    name: 'TreeSelect',
    description: 'TreeSelect lets users pick from a hierarchical tree structure in a dropdown.',
    examples: [
      {
        title: 'Single Selection',
        demo: <TreeSelectSingleDemo />,
        code: `const treeData = [
  { label: 'Engineering', key: 'eng', children: [
    { label: 'Frontend', key: 'fe' },
    { label: 'Backend', key: 'be' },
  ]},
  { label: 'Design', key: 'design', children: [
    { label: 'UX', key: 'ux' },
    { label: 'Visual', key: 'visual' },
  ]},
];
<TreeSelect treeData={treeData} value={value} onChange={setValue} placeholder="Select department" />`,
      },
      {
        title: 'Multiple Selection',
        demo: <TreeSelectMultipleDemo />,
        code: `<TreeSelect treeData={treeData} value={value} onChange={setValue} multiple placeholder="Select departments" />`,
      },
    ],
  },

  Splitter: {
    name: 'Splitter',
    description: 'Splitter divides a container into resizable panels separated by a draggable handle.',
    examples: [
      {
        title: 'Horizontal Split',
        demo: (
          <Splitter orientation="horizontal" className="h-[200px] border border-neutral-stroke-2 rounded-m">
            <SplitterPanel defaultSize={50}>
              <div className="flex items-center justify-center h-full bg-subtle-background p-m">
                <Text>Left Panel</Text>
              </div>
            </SplitterPanel>
            <SplitterResizeHandle />
            <SplitterPanel defaultSize={50}>
              <div className="flex items-center justify-center h-full p-m">
                <Text>Right Panel</Text>
              </div>
            </SplitterPanel>
          </Splitter>
        ),
        code: `<Splitter orientation="horizontal" className="h-[200px]">
  <SplitterPanel defaultSize={50}>
    <div>Left Panel</div>
  </SplitterPanel>
  <SplitterResizeHandle />
  <SplitterPanel defaultSize={50}>
    <div>Right Panel</div>
  </SplitterPanel>
</Splitter>`,
      },
      {
        title: 'Vertical Split',
        demo: (
          <Splitter orientation="vertical" className="h-[300px] border border-neutral-stroke-2 rounded-m">
            <SplitterPanel defaultSize={40}>
              <div className="flex items-center justify-center h-full bg-subtle-background p-m">
                <Text>Top Panel</Text>
              </div>
            </SplitterPanel>
            <SplitterResizeHandle />
            <SplitterPanel defaultSize={60}>
              <div className="flex items-center justify-center h-full p-m">
                <Text>Bottom Panel</Text>
              </div>
            </SplitterPanel>
          </Splitter>
        ),
        code: `<Splitter orientation="vertical" className="h-[300px]">
  <SplitterPanel defaultSize={40}>
    <div>Top Panel</div>
  </SplitterPanel>
  <SplitterResizeHandle />
  <SplitterPanel defaultSize={60}>
    <div>Bottom Panel</div>
  </SplitterPanel>
</Splitter>`,
      },
    ],
  },

  Form: {
    name: 'Form',
    description: 'Form provides form state management with validation, error display, and submission handling via useForm.',
    examples: [
      {
        title: 'Login Form',
        description: 'A form with email and password validation using useForm.',
        demo: <FormDemo />,
        code: `const form = useForm({
  defaultValues: { email: '', password: '' },
  onSubmit: (values) => console.log(values),
});

<Form form={form}>
  <FormField
    name="email"
    label="Email"
    rules={[
      { required: true, message: 'Email is required' },
      { pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Invalid email' },
    ]}
  >
    <Input placeholder="you@example.com" {...form.getFieldProps('email')} />
  </FormField>
  <FormField
    name="password"
    label="Password"
    rules={[
      { required: true, message: 'Password is required' },
      { minLength: 8, message: 'Min 8 characters' },
    ]}
  >
    <PasswordInput placeholder="Enter password" {...form.getFieldProps('password')} />
  </FormField>
  <Button type="submit" appearance="primary">Log in</Button>
</Form>`,
      },
    ],
  },

  Notification: {
    name: 'Notification',
    description: 'Notification displays brief, non-intrusive messages using different intents via a provider and hook.',
    examples: [
      {
        title: 'Notification Intents',
        description: 'Trigger info, success, warning, and error notifications.',
        demo: <NotificationDemoWrapper />,
        code: `function App() {
  return (
    <NotificationProvider>
      <NotificationButtons />
    </NotificationProvider>
  );
}

function NotificationButtons() {
  const { notify } = useNotification();
  return (
    <div className="flex gap-s">
      <Button onClick={() => notify({ title: 'Info', description: '...', intent: 'info' })}>Info</Button>
      <Button onClick={() => notify({ title: 'Success', description: '...', intent: 'success' })}>Success</Button>
      <Button onClick={() => notify({ title: 'Warning', description: '...', intent: 'warning' })}>Warning</Button>
      <Button onClick={() => notify({ title: 'Error', description: '...', intent: 'error' })}>Error</Button>
    </div>
  );
}`,
      },
    ],
  },
};
