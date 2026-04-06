import type { ComponentPageProps } from '../components/ComponentPage';
import { Button, Text, Label, Link, Icon, Image, Divider } from '@fluentwind/react';

export const generalDemos: Record<string, ComponentPageProps> = {
  Button: {
    name: 'Button',
    description: 'A button triggers an action or event when activated.',
    examples: [
      {
        title: 'Appearances',
        description: 'Buttons support different visual appearances to indicate hierarchy and intent.',
        demo: (
          <div className="flex gap-s flex-wrap items-center">
            <Button appearance="primary">Primary</Button>
            <Button appearance="secondary">Secondary</Button>
            <Button appearance="outline">Outline</Button>
            <Button appearance="subtle">Subtle</Button>
            <Button appearance="transparent">Transparent</Button>
          </div>
        ),
        code: `<Button appearance="primary">Primary</Button>
<Button appearance="secondary">Secondary</Button>
<Button appearance="outline">Outline</Button>
<Button appearance="subtle">Subtle</Button>
<Button appearance="transparent">Transparent</Button>`,
      },
      {
        title: 'Sizes',
        description: 'Buttons come in small, medium, and large sizes.',
        demo: (
          <div className="flex gap-s items-center">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        ),
        code: `<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`,
      },
      {
        title: 'Shapes',
        description: 'Buttons can have rounded, circular, or square corners.',
        demo: (
          <div className="flex gap-s items-center">
            <Button shape="rounded">Rounded</Button>
            <Button shape="circular">Circular</Button>
            <Button shape="square">Square</Button>
          </div>
        ),
        code: `<Button shape="rounded">Rounded</Button>
<Button shape="circular">Circular</Button>
<Button shape="square">Square</Button>`,
      },
      {
        title: 'Disabled',
        description: 'Buttons can be disabled or disabled but still focusable for accessibility.',
        demo: (
          <div className="flex gap-s items-center">
            <Button disabled>Disabled</Button>
            <Button disabledFocusable>Disabled Focusable</Button>
          </div>
        ),
        code: `<Button disabled>Disabled</Button>
<Button disabledFocusable>Disabled Focusable</Button>`,
      },
    ],
  },

  Text: {
    name: 'Text',
    description: 'Text is used to display content with consistent typography across the design system.',
    examples: [
      {
        title: 'Variants',
        description: 'Text supports the full Fluent type ramp from caption to display.',
        demo: (
          <div className="flex flex-col gap-s">
            <Text variant="display" as="h1">Display</Text>
            <Text variant="largeTitle" as="h1">Large Title</Text>
            <Text variant="title1" as="h2">Title 1</Text>
            <Text variant="title2" as="h2">Title 2</Text>
            <Text variant="title3" as="h3">Title 3</Text>
            <Text variant="subtitle1" as="h4">Subtitle 1</Text>
            <Text variant="subtitle2" as="h5">Subtitle 2</Text>
            <Text variant="body1">Body 1</Text>
            <Text variant="body1Strong">Body 1 Strong</Text>
            <Text variant="body1Stronger">Body 1 Stronger</Text>
            <Text variant="caption1">Caption 1</Text>
            <Text variant="caption2">Caption 2</Text>
          </div>
        ),
        code: `<Text variant="display" as="h1">Display</Text>
<Text variant="largeTitle" as="h1">Large Title</Text>
<Text variant="title1" as="h2">Title 1</Text>
<Text variant="title2" as="h2">Title 2</Text>
<Text variant="title3" as="h3">Title 3</Text>
<Text variant="subtitle1" as="h4">Subtitle 1</Text>
<Text variant="subtitle2" as="h5">Subtitle 2</Text>
<Text variant="body1">Body 1</Text>
<Text variant="caption1">Caption 1</Text>
<Text variant="caption2">Caption 2</Text>`,
      },
      {
        title: 'Text Formatting',
        description: 'Text can be italic, strikethrough, or truncated.',
        demo: (
          <div className="flex flex-col gap-s">
            <Text italic>This text is italic</Text>
            <Text strikethrough>This text has a strikethrough</Text>
            <Text underline>This text is underlined</Text>
            <div style={{ width: 200 }}>
              <Text truncate block>This text is truncated because it is very long and does not fit in the container</Text>
            </div>
          </div>
        ),
        code: `<Text italic>This text is italic</Text>
<Text strikethrough>This text has a strikethrough</Text>
<Text underline>This text is underlined</Text>
<div style={{ width: 200 }}>
  <Text truncate block>This text is truncated...</Text>
</div>`,
      },
      {
        title: 'Font Families',
        description: 'Text can use base, monospace, or numeric font families.',
        demo: (
          <div className="flex flex-col gap-s">
            <Text font="base">Base font (default)</Text>
            <Text font="mono">Monospace font for code</Text>
            <Text font="numeric">Numeric font: 1,234,567.89</Text>
          </div>
        ),
        code: `<Text font="base">Base font (default)</Text>
<Text font="mono">Monospace font for code</Text>
<Text font="numeric">Numeric font: 1,234,567.89</Text>`,
      },
    ],
  },

  Label: {
    name: 'Label',
    description: 'Labels provide a name or title for a form control or group of controls.',
    examples: [
      {
        title: 'Sizes',
        description: 'Labels come in small, medium, and large sizes.',
        demo: (
          <div className="flex flex-col gap-s">
            <Label size="small">Small label</Label>
            <Label size="medium">Medium label</Label>
            <Label size="large">Large label</Label>
          </div>
        ),
        code: `<Label size="small">Small label</Label>
<Label size="medium">Medium label</Label>
<Label size="large">Large label</Label>`,
      },
      {
        title: 'Required & Disabled',
        description: 'Labels can show a required indicator or appear disabled.',
        demo: (
          <div className="flex flex-col gap-s">
            <Label required>Required field</Label>
            <Label weight="semibold">Semibold label</Label>
            <Label disabled>Disabled label</Label>
          </div>
        ),
        code: `<Label required>Required field</Label>
<Label weight="semibold">Semibold label</Label>
<Label disabled>Disabled label</Label>`,
      },
    ],
  },

  Link: {
    name: 'Link',
    description: 'Links navigate to a different page, section, or resource.',
    examples: [
      {
        title: 'Appearances',
        description: 'Links can appear as default or subtle, and inline or standalone.',
        demo: (
          <div className="flex flex-col gap-s">
            <Link href="#">Default link</Link>
            <Link href="#" appearance="subtle">Subtle link</Link>
            <div>
              <Text>This is a paragraph with an <Link href="#" inline>inline link</Link> inside it.</Text>
            </div>
          </div>
        ),
        code: `<Link href="#">Default link</Link>
<Link href="#" appearance="subtle">Subtle link</Link>
<Text>This is a paragraph with an <Link href="#" inline>inline link</Link> inside it.</Text>`,
      },
      {
        title: 'Disabled',
        description: 'Links can be disabled to prevent interaction.',
        demo: (
          <div className="flex gap-s items-center">
            <Link href="#">Enabled link</Link>
            <Link href="#" disabled>Disabled link</Link>
          </div>
        ),
        code: `<Link href="#">Enabled link</Link>
<Link href="#" disabled>Disabled link</Link>`,
      },
    ],
  },

  Icon: {
    name: 'Icon',
    description: 'Icons are visual symbols used to represent actions, objects, or concepts.',
    examples: [
      {
        title: 'Sizes',
        description: 'Icons support multiple sizes from 12 to 48 pixels.',
        demo: (
          <div className="flex gap-m items-center">
            <Icon size={12} label="Small icon">
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" fill="currentColor" />
            </Icon>
            <Icon size={16} label="Default icon">
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" fill="currentColor" />
            </Icon>
            <Icon size={20} label="Medium icon">
              <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 10-16Z" fill="currentColor" />
            </Icon>
            <Icon size={24} label="Large icon">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 12-20Z" fill="currentColor" />
            </Icon>
            <Icon size={32} label="Extra large icon">
              <path d="M16 3a13 13 0 1 0 0 26 13 13 0 0 0 16-26Z" fill="currentColor" />
            </Icon>
            <Icon size={48} label="Huge icon">
              <path d="M24 4a20 20 0 1 0 0 40 20 20 0 0 0 24-40Z" fill="currentColor" />
            </Icon>
          </div>
        ),
        code: `<Icon size={12} label="Small icon">
  <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z" fill="currentColor" />
</Icon>
<Icon size={16} label="Default icon">...</Icon>
<Icon size={20} label="Medium icon">...</Icon>
<Icon size={24} label="Large icon">...</Icon>
<Icon size={32} label="Extra large icon">...</Icon>
<Icon size={48} label="Huge icon">...</Icon>`,
      },
      {
        title: 'Filled Variant',
        description: 'Icons can use the filled style variant.',
        demo: (
          <div className="flex gap-m items-center">
            <Icon size={24} label="Regular">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z" fill="currentColor" />
            </Icon>
            <Icon size={24} filled label="Filled">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" fill="currentColor" />
            </Icon>
          </div>
        ),
        code: `<Icon size={24} label="Regular">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10..." fill="currentColor" />
</Icon>
<Icon size={24} filled label="Filled">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10..." fill="currentColor" />
</Icon>`,
      },
    ],
  },

  Image: {
    name: 'Image',
    description: 'Image displays a picture with optional styling such as borders, shapes, and shadows.',
    examples: [
      {
        title: 'Shapes',
        description: 'Images can be rounded, circular, or square.',
        demo: (
          <div className="flex gap-m items-center">
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Rounded" shape="rounded" width={120} height={120} />
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Circular" shape="circular" width={120} height={120} />
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Square" shape="square" width={120} height={120} />
          </div>
        ),
        code: `<Image src="https://placehold.co/200x200/0078D4/white?text=FW" shape="rounded" />
<Image src="https://placehold.co/200x200/0078D4/white?text=FW" shape="circular" />
<Image src="https://placehold.co/200x200/0078D4/white?text=FW" shape="square" />`,
      },
      {
        title: 'Bordered & Shadow',
        description: 'Images can have borders and shadow effects.',
        demo: (
          <div className="flex gap-m items-center">
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Bordered" bordered width={120} height={120} />
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Shadow" shadow width={120} height={120} />
            <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Both" bordered shadow shape="rounded" width={120} height={120} />
          </div>
        ),
        code: `<Image src="..." bordered />
<Image src="..." shadow />
<Image src="..." bordered shadow shape="rounded" />`,
      },
      {
        title: 'Fit Modes',
        description: 'Control how the image fits its container.',
        demo: (
          <div className="flex gap-m items-end">
            <div>
              <Text variant="caption1" block>cover</Text>
              <div className="w-[120px] h-[80px] border border-neutral-stroke-2">
                <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Cover" fit="cover" width={120} height={80} />
              </div>
            </div>
            <div>
              <Text variant="caption1" block>contain</Text>
              <div className="w-[120px] h-[80px] border border-neutral-stroke-2">
                <Image src="https://placehold.co/200x200/0078D4/white?text=FW" alt="Contain" fit="contain" width={120} height={80} />
              </div>
            </div>
          </div>
        ),
        code: `<Image src="..." fit="cover" />
<Image src="..." fit="contain" />`,
      },
    ],
  },

  Divider: {
    name: 'Divider',
    description: 'A divider visually separates content into groups.',
    examples: [
      {
        title: 'Appearances',
        description: 'Dividers can have different visual weights.',
        demo: (
          <div className="flex flex-col gap-m">
            <div>
              <Text variant="caption1" block>Default</Text>
              <Divider />
            </div>
            <div>
              <Text variant="caption1" block>Subtle</Text>
              <Divider appearance="subtle" />
            </div>
            <div>
              <Text variant="caption1" block>Brand</Text>
              <Divider appearance="brand" />
            </div>
            <div>
              <Text variant="caption1" block>Strong</Text>
              <Divider appearance="strong" />
            </div>
          </div>
        ),
        code: `<Divider />
<Divider appearance="subtle" />
<Divider appearance="brand" />
<Divider appearance="strong" />`,
      },
      {
        title: 'With Label',
        description: 'Dividers can display label content aligned to start, center, or end.',
        demo: (
          <div className="flex flex-col gap-m">
            <Divider alignContent="start">Start</Divider>
            <Divider alignContent="center">Center</Divider>
            <Divider alignContent="end">End</Divider>
          </div>
        ),
        code: `<Divider alignContent="start">Start</Divider>
<Divider alignContent="center">Center</Divider>
<Divider alignContent="end">End</Divider>`,
      },
      {
        title: 'Vertical',
        description: 'Dividers can be oriented vertically.',
        demo: (
          <div className="flex gap-m items-center h-[60px]">
            <Text>Section A</Text>
            <Divider vertical />
            <Text>Section B</Text>
            <Divider vertical appearance="brand" />
            <Text>Section C</Text>
          </div>
        ),
        code: `<div className="flex items-center h-[60px]">
  <Text>Section A</Text>
  <Divider vertical />
  <Text>Section B</Text>
  <Divider vertical appearance="brand" />
  <Text>Section C</Text>
</div>`,
      },
    ],
  },
};
