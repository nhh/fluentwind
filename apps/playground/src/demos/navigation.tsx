import { useState } from 'react';
import {
  Tablist,
  Tab,
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  Toolbar,
  ToolbarButton,
  Divider,
  Pagination,
  Steps,
  StepItem,
} from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Tablist helpers ── */
function TablistBasicDemo() {
  const [selected, setSelected] = useState('tab1');
  return (
    <Tablist selectedValue={selected} onTabSelect={setSelected}>
      <Tab value="tab1">Home</Tab>
      <Tab value="tab2">Profile</Tab>
      <Tab value="tab3">Settings</Tab>
    </Tablist>
  );
}

function TablistAppearanceDemo() {
  const [selected, setSelected] = useState('a');
  return (
    <div className="space-y-m">
      <div>
        <p className="text-200 text-neutral-foreground-3 mb-xs">Transparent</p>
        <Tablist selectedValue={selected} onTabSelect={setSelected} appearance="transparent">
          <Tab value="a">Dashboard</Tab>
          <Tab value="b">Analytics</Tab>
          <Tab value="c">Reports</Tab>
        </Tablist>
      </div>
      <div>
        <p className="text-200 text-neutral-foreground-3 mb-xs">Subtle</p>
        <Tablist selectedValue={selected} onTabSelect={setSelected} appearance="subtle">
          <Tab value="a">Dashboard</Tab>
          <Tab value="b">Analytics</Tab>
          <Tab value="c">Reports</Tab>
        </Tablist>
      </div>
    </div>
  );
}

function TablistSizeDemo() {
  const [selected, setSelected] = useState('x');
  return (
    <div className="space-y-m">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size}>
          <p className="text-200 text-neutral-foreground-3 mb-xs capitalize">{size}</p>
          <Tablist selectedValue={selected} onTabSelect={setSelected} size={size}>
            <Tab value="x">First</Tab>
            <Tab value="y">Second</Tab>
            <Tab value="z">Third</Tab>
          </Tablist>
        </div>
      ))}
    </div>
  );
}

/* ── Pagination helper ── */
function PaginationControlledDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-s">
      <p className="text-200 text-neutral-foreground-2">Current page: {page}</p>
      <Pagination totalPages={10} currentPage={page} onChange={setPage} />
    </div>
  );
}

/* ── Steps helper ── */
function StepsInteractiveDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="space-y-m">
      <Steps current={current}>
        <StepItem title="Account" description="Create your account" />
        <StepItem title="Verification" description="Verify your email" />
        <StepItem title="Profile" description="Set up your profile" />
        <StepItem title="Complete" description="All done!" />
      </Steps>
      <div className="flex gap-s">
        <button
          type="button"
          className="px-m py-xs rounded-medium bg-brand-background text-neutral-foreground-on-brand text-200"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-m py-xs rounded-medium bg-brand-background text-neutral-foreground-on-brand text-200"
          onClick={() => setCurrent((c) => Math.min(3, c + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const navigationDemos: Record<string, ComponentPageProps> = {
  Tablist: {
    name: 'Tablist',
    description: 'A horizontal or vertical set of tabs for switching between views.',
    examples: [
      {
        title: 'Basic Tablist',
        description: 'A simple tablist with selectable tabs.',
        demo: <TablistBasicDemo />,
        code: `const [selected, setSelected] = useState('tab1');

<Tablist selectedValue={selected} onTabSelect={setSelected}>
  <Tab value="tab1">Home</Tab>
  <Tab value="tab2">Profile</Tab>
  <Tab value="tab3">Settings</Tab>
</Tablist>`,
      },
      {
        title: 'Appearances',
        description: 'Tablist supports transparent and subtle appearances.',
        demo: <TablistAppearanceDemo />,
        code: `<Tablist appearance="transparent" selectedValue={selected} onTabSelect={setSelected}>
  <Tab value="a">Dashboard</Tab>
  <Tab value="b">Analytics</Tab>
  <Tab value="c">Reports</Tab>
</Tablist>

<Tablist appearance="subtle" selectedValue={selected} onTabSelect={setSelected}>
  <Tab value="a">Dashboard</Tab>
  <Tab value="b">Analytics</Tab>
  <Tab value="c">Reports</Tab>
</Tablist>`,
      },
      {
        title: 'Sizes',
        description: 'Tabs are available in small, medium, and large sizes.',
        demo: <TablistSizeDemo />,
        code: `<Tablist size="small" selectedValue={selected} onTabSelect={setSelected}>
  <Tab value="x">First</Tab>
  <Tab value="y">Second</Tab>
</Tablist>

<Tablist size="medium" ...>...</Tablist>
<Tablist size="large" ...>...</Tablist>`,
      },
    ],
  },

  Breadcrumb: {
    name: 'Breadcrumb',
    description: 'Displays the current location within a navigational hierarchy.',
    examples: [
      {
        title: 'Basic Breadcrumb',
        description: 'A simple breadcrumb trail with the last item marked as current.',
        demo: (
          <Breadcrumb>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Products</BreadcrumbItem>
            <BreadcrumbItem current>Laptop</BreadcrumbItem>
          </Breadcrumb>
        ),
        code: `<Breadcrumb>
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem href="#">Products</BreadcrumbItem>
  <BreadcrumbItem current>Laptop</BreadcrumbItem>
</Breadcrumb>`,
      },
      {
        title: 'With Slash Divider',
        description: 'Use a slash character as the breadcrumb divider.',
        demo: (
          <Breadcrumb dividerType="slash">
            <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="#">Settings</BreadcrumbItem>
            <BreadcrumbItem href="#">Account</BreadcrumbItem>
            <BreadcrumbItem current>Security</BreadcrumbItem>
          </Breadcrumb>
        ),
        code: `<Breadcrumb dividerType="slash">
  <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="#">Settings</BreadcrumbItem>
  <BreadcrumbItem href="#">Account</BreadcrumbItem>
  <BreadcrumbItem current>Security</BreadcrumbItem>
</Breadcrumb>`,
      },
      {
        title: 'Sizes',
        description: 'Breadcrumbs support small, medium, and large sizes.',
        demo: (
          <div className="space-y-m">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <div key={size}>
                <p className="text-200 text-neutral-foreground-3 mb-xs capitalize">{size}</p>
                <Breadcrumb size={size}>
                  <BreadcrumbItem href="#">Home</BreadcrumbItem>
                  <BreadcrumbItem href="#">Docs</BreadcrumbItem>
                  <BreadcrumbItem current>API</BreadcrumbItem>
                </Breadcrumb>
              </div>
            ))}
          </div>
        ),
        code: `<Breadcrumb size="small">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem current>API</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb size="medium">...</Breadcrumb>
<Breadcrumb size="large">...</Breadcrumb>`,
      },
    ],
  },

  Nav: {
    name: 'Nav',
    description: 'A vertical navigation component with selectable items.',
    examples: [
      {
        title: 'Basic Navigation',
        description: 'Vertical navigation with an active item.',
        demo: (
          <Nav>
            <NavItem value="home" selected>Home</NavItem>
            <NavItem value="about">About</NavItem>
            <NavItem value="contact">Contact</NavItem>
          </Nav>
        ),
        code: `<Nav>
  <NavItem value="home" selected>Home</NavItem>
  <NavItem value="about">About</NavItem>
  <NavItem value="contact">Contact</NavItem>
</Nav>`,
      },
      {
        title: 'With Icons',
        description: 'Nav items can include icons for visual distinction.',
        demo: (
          <Nav>
            <NavItem value="inbox" icon={<span>📥</span>} selected>Inbox</NavItem>
            <NavItem value="sent" icon={<span>📤</span>}>Sent</NavItem>
            <NavItem value="drafts" icon={<span>📝</span>}>Drafts</NavItem>
            <NavItem value="trash" icon={<span>🗑</span>}>Trash</NavItem>
          </Nav>
        ),
        code: `<Nav>
  <NavItem value="inbox" icon={<span>📥</span>} selected>Inbox</NavItem>
  <NavItem value="sent" icon={<span>📤</span>}>Sent</NavItem>
  <NavItem value="drafts" icon={<span>📝</span>}>Drafts</NavItem>
  <NavItem value="trash" icon={<span>🗑</span>}>Trash</NavItem>
</Nav>`,
      },
      {
        title: 'With Links',
        description: 'Nav items can render as links when given an href.',
        demo: (
          <Nav>
            <NavItem value="docs" href="#" selected>Documentation</NavItem>
            <NavItem value="api" href="#">API Reference</NavItem>
            <NavItem value="examples" href="#">Examples</NavItem>
          </Nav>
        ),
        code: `<Nav>
  <NavItem value="docs" href="#" selected>Documentation</NavItem>
  <NavItem value="api" href="#">API Reference</NavItem>
  <NavItem value="examples" href="#">Examples</NavItem>
</Nav>`,
      },
    ],
  },

  Toolbar: {
    name: 'Toolbar',
    description: 'A container for grouping a set of controls such as buttons and menu items.',
    examples: [
      {
        title: 'Basic Toolbar',
        description: 'A toolbar with labeled buttons.',
        demo: (
          <Toolbar>
            <ToolbarButton>Cut</ToolbarButton>
            <ToolbarButton>Copy</ToolbarButton>
            <ToolbarButton>Paste</ToolbarButton>
          </Toolbar>
        ),
        code: `<Toolbar>
  <ToolbarButton>Cut</ToolbarButton>
  <ToolbarButton>Copy</ToolbarButton>
  <ToolbarButton>Paste</ToolbarButton>
</Toolbar>`,
      },
      {
        title: 'With Dividers',
        description: 'Use Divider to separate groups of related actions.',
        demo: (
          <Toolbar>
            <ToolbarButton>Undo</ToolbarButton>
            <ToolbarButton>Redo</ToolbarButton>
            <Divider vertical className="h-5" />
            <ToolbarButton>Bold</ToolbarButton>
            <ToolbarButton>Italic</ToolbarButton>
            <ToolbarButton>Underline</ToolbarButton>
            <Divider vertical className="h-5" />
            <ToolbarButton>Align Left</ToolbarButton>
            <ToolbarButton>Align Center</ToolbarButton>
          </Toolbar>
        ),
        code: `<Toolbar>
  <ToolbarButton>Undo</ToolbarButton>
  <ToolbarButton>Redo</ToolbarButton>
  <Divider vertical className="h-5" />
  <ToolbarButton>Bold</ToolbarButton>
  <ToolbarButton>Italic</ToolbarButton>
  <ToolbarButton>Underline</ToolbarButton>
  <Divider vertical className="h-5" />
  <ToolbarButton>Align Left</ToolbarButton>
  <ToolbarButton>Align Center</ToolbarButton>
</Toolbar>`,
      },
      {
        title: 'Subtle Appearance',
        description: 'Toolbar buttons with a subtle visual style.',
        demo: (
          <Toolbar>
            <ToolbarButton appearance="subtle">New</ToolbarButton>
            <ToolbarButton appearance="subtle">Open</ToolbarButton>
            <ToolbarButton appearance="subtle">Save</ToolbarButton>
          </Toolbar>
        ),
        code: `<Toolbar>
  <ToolbarButton appearance="subtle">New</ToolbarButton>
  <ToolbarButton appearance="subtle">Open</ToolbarButton>
  <ToolbarButton appearance="subtle">Save</ToolbarButton>
</Toolbar>`,
      },
    ],
  },

  Pagination: {
    name: 'Pagination',
    description: 'Allows users to navigate through pages of content.',
    examples: [
      {
        title: 'Basic Pagination',
        description: 'A simple pagination with a set number of pages.',
        demo: <Pagination totalPages={8} defaultPage={1} />,
        code: `<Pagination totalPages={8} defaultPage={1} />`,
      },
      {
        title: 'Sizes',
        description: 'Pagination supports small and medium sizes.',
        demo: (
          <div className="space-y-m">
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">Small</p>
              <Pagination totalPages={5} defaultPage={1} size="small" />
            </div>
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">Medium</p>
              <Pagination totalPages={5} defaultPage={1} size="medium" />
            </div>
          </div>
        ),
        code: `<Pagination totalPages={5} size="small" />
<Pagination totalPages={5} size="medium" />`,
      },
      {
        title: 'Controlled',
        description: 'Control the current page with state.',
        demo: <PaginationControlledDemo />,
        code: `const [page, setPage] = useState(1);

<Pagination totalPages={10} currentPage={page} onChange={setPage} />`,
      },
    ],
  },

  Steps: {
    name: 'Steps',
    description: 'A navigation bar that guides users through the steps of a task.',
    examples: [
      {
        title: 'Horizontal Steps',
        description: 'A typical horizontal step indicator.',
        demo: (
          <Steps current={1}>
            <StepItem title="Account" description="Create your account" />
            <StepItem title="Verification" description="Verify your identity" />
            <StepItem title="Payment" description="Add payment method" />
          </Steps>
        ),
        code: `<Steps current={1}>
  <StepItem title="Account" description="Create your account" />
  <StepItem title="Verification" description="Verify your identity" />
  <StepItem title="Payment" description="Add payment method" />
</Steps>`,
      },
      {
        title: 'Vertical Orientation',
        description: 'Steps displayed in a vertical layout.',
        demo: (
          <Steps current={2} orientation="vertical">
            <StepItem title="Order Placed" description="Your order has been submitted" />
            <StepItem title="Processing" description="We are preparing your order" />
            <StepItem title="Shipped" description="Your order is on the way" />
            <StepItem title="Delivered" description="Package arrived" />
          </Steps>
        ),
        code: `<Steps current={2} orientation="vertical">
  <StepItem title="Order Placed" description="Your order has been submitted" />
  <StepItem title="Processing" description="We are preparing your order" />
  <StepItem title="Shipped" description="Your order is on the way" />
  <StepItem title="Delivered" description="Package arrived" />
</Steps>`,
      },
      {
        title: 'Interactive with Error State',
        description: 'Navigate between steps. One step shows an error status.',
        demo: (
          <div className="space-y-l">
            <StepsInteractiveDemo />
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">With error state</p>
              <Steps current={1}>
                <StepItem title="Details" status="finish" />
                <StepItem title="Validation" status="error" description="Validation failed" />
                <StepItem title="Submit" />
              </Steps>
            </div>
          </div>
        ),
        code: `// Interactive steps
const [current, setCurrent] = useState(1);

<Steps current={current}>
  <StepItem title="Account" description="Create your account" />
  <StepItem title="Verification" description="Verify your email" />
  <StepItem title="Profile" description="Set up your profile" />
  <StepItem title="Complete" description="All done!" />
</Steps>

// Error state
<Steps current={1}>
  <StepItem title="Details" status="finish" />
  <StepItem title="Validation" status="error" description="Validation failed" />
  <StepItem title="Submit" />
</Steps>`,
      },
    ],
  },
};
