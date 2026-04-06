import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Drawer,
  Popover,
  Tooltip,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuItem,
  MenuDivider,
  Dropdown,
  InfoLabel,
  Input,
  Divider,
} from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Dialog helpers ── */
function DialogBasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogSurface>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogBody>
            Are you sure you want to proceed with this action? This cannot be undone.
          </DialogBody>
          <DialogActions>
            <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
}

function DialogAlertDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Alert Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} modalType="alert">
        <DialogSurface>
          <DialogTitle>Session Expired</DialogTitle>
          <DialogBody>
            Your session has expired. Please sign in again to continue.
          </DialogBody>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Sign In</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
}

function DialogFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create New Item</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogSurface>
          <DialogTitle>Create Item</DialogTitle>
          <DialogBody>
            <div className="space-y-m">
              <div>
                <label className="text-200 font-medium text-neutral-foreground-1 mb-xxs block">Name</label>
                <Input placeholder="Enter item name" className="w-full" />
              </div>
              <div>
                <label className="text-200 font-medium text-neutral-foreground-1 mb-xxs block">Description</label>
                <Input placeholder="Enter description" className="w-full" />
              </div>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
}

/* ── Drawer helpers ── */
function DrawerStartDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Start Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} position="start">
        <div className="p-l space-y-m">
          <h3 className="text-400 font-semibold text-neutral-foreground-1">Navigation</h3>
          <Divider />
          <nav className="space-y-xs">
            <div className="text-200 text-neutral-foreground-2 px-s py-xs rounded-medium hover:bg-subtle-background-hover cursor-pointer">Dashboard</div>
            <div className="text-200 text-neutral-foreground-2 px-s py-xs rounded-medium hover:bg-subtle-background-hover cursor-pointer">Projects</div>
            <div className="text-200 text-neutral-foreground-2 px-s py-xs rounded-medium hover:bg-subtle-background-hover cursor-pointer">Settings</div>
          </nav>
          <Divider />
          <Button onClick={() => setOpen(false)} appearance="subtle" className="w-full">Close</Button>
        </div>
      </Drawer>
    </>
  );
}

function DrawerEndDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open End Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} position="end" size="medium">
        <div className="p-l space-y-m">
          <h3 className="text-400 font-semibold text-neutral-foreground-1">Details Panel</h3>
          <Divider />
          <p className="text-200 text-neutral-foreground-2">
            This drawer slides in from the end (right side) and can display detailed content,
            forms, or secondary navigation.
          </p>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Drawer>
    </>
  );
}

function DrawerBottomDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Bottom Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} position="bottom" size="small">
        <div className="p-l space-y-m">
          <h3 className="text-400 font-semibold text-neutral-foreground-1">Quick Actions</h3>
          <div className="flex gap-s">
            <Button onClick={() => setOpen(false)}>Share</Button>
            <Button onClick={() => setOpen(false)}>Copy Link</Button>
            <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

/* ── Dropdown helper ── */
function DropdownControlledDemo() {
  const [value, setValue] = useState('');
  return (
    <div className="space-y-s">
      <Dropdown
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Choose a framework"
      />
      {value && <p className="text-200 text-neutral-foreground-2">Selected: {value}</p>}
    </div>
  );
}

export const overlayDemos: Record<string, ComponentPageProps> = {
  Dialog: {
    name: 'Dialog',
    description: 'A modal overlay that requires user interaction before returning to the main content.',
    examples: [
      {
        title: 'Basic Dialog',
        description: 'A simple confirmation dialog with actions.',
        demo: <DialogBasicDemo />,
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogSurface>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogBody>
      Are you sure you want to proceed?
    </DialogBody>
    <DialogActions>
      <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </DialogActions>
  </DialogSurface>
</Dialog>`,
      },
      {
        title: 'Alert Dialog',
        description: 'An alert-type dialog that demands acknowledgment.',
        demo: <DialogAlertDemo />,
        code: `<Dialog open={open} onOpenChange={setOpen} modalType="alert">
  <DialogSurface>
    <DialogTitle>Session Expired</DialogTitle>
    <DialogBody>
      Your session has expired. Please sign in again.
    </DialogBody>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Sign In</Button>
    </DialogActions>
  </DialogSurface>
</Dialog>`,
      },
      {
        title: 'Form Dialog',
        description: 'A dialog containing form fields.',
        demo: <DialogFormDemo />,
        code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogSurface>
    <DialogTitle>Create Item</DialogTitle>
    <DialogBody>
      <Input placeholder="Enter item name" />
      <Input placeholder="Enter description" />
    </DialogBody>
    <DialogActions>
      <Button appearance="subtle" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Create</Button>
    </DialogActions>
  </DialogSurface>
</Dialog>`,
      },
    ],
  },

  Drawer: {
    name: 'Drawer',
    description: 'A panel that slides in from the edge of the screen to display additional content.',
    examples: [
      {
        title: 'Start (Left) Drawer',
        description: 'A drawer that slides in from the left side.',
        demo: <DrawerStartDemo />,
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Start Drawer</Button>
<Drawer open={open} onOpenChange={setOpen} position="start">
  <div className="p-l">
    <h3>Navigation</h3>
    <nav>...</nav>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Drawer>`,
      },
      {
        title: 'End (Right) Drawer',
        description: 'A drawer that slides in from the right side with medium size.',
        demo: <DrawerEndDemo />,
        code: `<Drawer open={open} onOpenChange={setOpen} position="end" size="medium">
  <div className="p-l">
    <h3>Details Panel</h3>
    <p>Content goes here...</p>
  </div>
</Drawer>`,
      },
      {
        title: 'Bottom Drawer',
        description: 'A drawer that slides up from the bottom.',
        demo: <DrawerBottomDemo />,
        code: `<Drawer open={open} onOpenChange={setOpen} position="bottom" size="small">
  <div className="p-l">
    <h3>Quick Actions</h3>
    <Button>Share</Button>
    <Button>Copy Link</Button>
  </div>
</Drawer>`,
      },
    ],
  },

  Popover: {
    name: 'Popover',
    description: 'Displays rich content in a floating panel anchored to a trigger element.',
    examples: [
      {
        title: 'Basic Popover',
        description: 'Click the button to toggle a popover.',
        demo: (
          <Popover
            trigger={<Button>Show Popover</Button>}
            content={
              <div className="space-y-xs">
                <p className="text-200 font-medium text-neutral-foreground-1">Popover Title</p>
                <p className="text-200 text-neutral-foreground-2">
                  This is some helpful content inside a popover.
                </p>
              </div>
            }
          />
        ),
        code: `<Popover
  trigger={<Button>Show Popover</Button>}
  content={
    <div>
      <p>Popover Title</p>
      <p>This is some helpful content inside a popover.</p>
    </div>
  }
/>`,
      },
      {
        title: 'Positioning',
        description: 'Popovers can be positioned in different directions.',
        demo: (
          <div className="flex flex-wrap gap-s py-l">
            {(['above', 'below', 'before', 'after'] as const).map((pos) => (
              <Popover
                key={pos}
                positioning={pos}
                trigger={<Button>{pos}</Button>}
                content={
                  <p className="text-200 text-neutral-foreground-2">
                    Popover positioned {pos} the trigger.
                  </p>
                }
              />
            ))}
          </div>
        ),
        code: `<Popover positioning="above" trigger={<Button>above</Button>} content={...} />
<Popover positioning="below" trigger={<Button>below</Button>} content={...} />
<Popover positioning="before" trigger={<Button>before</Button>} content={...} />
<Popover positioning="after" trigger={<Button>after</Button>} content={...} />`,
      },
    ],
  },

  Tooltip: {
    name: 'Tooltip',
    description: 'A small popup that displays additional information on hover.',
    examples: [
      {
        title: 'Basic Tooltip',
        description: 'Hover over the button to see the tooltip.',
        demo: (
          <div className="flex gap-s">
            <Tooltip content="This is a tooltip" relationship="description">
              <Button>Hover me</Button>
            </Tooltip>
            <Tooltip content="Save your changes" relationship="description">
              <Button>Save</Button>
            </Tooltip>
          </div>
        ),
        code: `<Tooltip content="This is a tooltip" relationship="description">
  <Button>Hover me</Button>
</Tooltip>`,
      },
      {
        title: 'Positioning',
        description: 'Tooltips can appear in different positions.',
        demo: (
          <div className="flex flex-wrap gap-s py-l">
            {(['above', 'below', 'before', 'after'] as const).map((pos) => (
              <Tooltip key={pos} content={`Tooltip ${pos}`} positioning={pos} relationship="description">
                <Button>{pos}</Button>
              </Tooltip>
            ))}
          </div>
        ),
        code: `<Tooltip content="Tooltip above" positioning="above" relationship="description">
  <Button>above</Button>
</Tooltip>
<Tooltip content="Tooltip below" positioning="below" relationship="description">
  <Button>below</Button>
</Tooltip>`,
      },
      {
        title: 'Inverted Appearance',
        description: 'Use the inverted appearance for a different visual style.',
        demo: (
          <div className="flex gap-s">
            <Tooltip content="Normal tooltip" relationship="description">
              <Button>Normal</Button>
            </Tooltip>
            <Tooltip content="Inverted tooltip" appearance="inverted" relationship="description">
              <Button>Inverted</Button>
            </Tooltip>
          </div>
        ),
        code: `<Tooltip content="Normal tooltip" relationship="description">
  <Button>Normal</Button>
</Tooltip>
<Tooltip content="Inverted tooltip" appearance="inverted" relationship="description">
  <Button>Inverted</Button>
</Tooltip>`,
      },
    ],
  },

  Menu: {
    name: 'Menu',
    description: 'A dropdown menu that presents a list of actions or options.',
    examples: [
      {
        title: 'Basic Menu',
        description: 'Click the button to open a menu with items.',
        demo: (
          <Menu>
            <MenuTrigger>
              <Button>Open Menu</Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuItem>New File</MenuItem>
              <MenuItem>Open File</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuDivider />
              <MenuItem>Exit</MenuItem>
            </MenuPopover>
          </Menu>
        ),
        code: `<Menu>
  <MenuTrigger>
    <Button>Open Menu</Button>
  </MenuTrigger>
  <MenuPopover>
    <MenuItem>New File</MenuItem>
    <MenuItem>Open File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuDivider />
    <MenuItem>Exit</MenuItem>
  </MenuPopover>
</Menu>`,
      },
      {
        title: 'With Icons and Secondary Content',
        description: 'Menu items can include icons and secondary text.',
        demo: (
          <Menu>
            <MenuTrigger>
              <Button>Edit</Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuItem icon={<span>✂</span>} secondaryContent="Ctrl+X">Cut</MenuItem>
              <MenuItem icon={<span>📋</span>} secondaryContent="Ctrl+C">Copy</MenuItem>
              <MenuItem icon={<span>📄</span>} secondaryContent="Ctrl+V">Paste</MenuItem>
              <MenuDivider />
              <MenuItem icon={<span>🗑</span>} secondaryContent="Del">Delete</MenuItem>
            </MenuPopover>
          </Menu>
        ),
        code: `<Menu>
  <MenuTrigger>
    <Button>Edit</Button>
  </MenuTrigger>
  <MenuPopover>
    <MenuItem icon={<span>✂</span>} secondaryContent="Ctrl+X">Cut</MenuItem>
    <MenuItem icon={<span>📋</span>} secondaryContent="Ctrl+C">Copy</MenuItem>
    <MenuItem icon={<span>📄</span>} secondaryContent="Ctrl+V">Paste</MenuItem>
    <MenuDivider />
    <MenuItem icon={<span>🗑</span>} secondaryContent="Del">Delete</MenuItem>
  </MenuPopover>
</Menu>`,
      },
    ],
  },

  Dropdown: {
    name: 'Dropdown',
    description: 'A selection control that allows users to pick a single option from a list.',
    examples: [
      {
        title: 'Basic Dropdown',
        description: 'A simple dropdown with options.',
        demo: (
          <Dropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
              { value: 'date', label: 'Date' },
            ]}
            placeholder="Select a fruit"
          />
        ),
        code: `<Dropdown
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
  ]}
  placeholder="Select a fruit"
/>`,
      },
      {
        title: 'Controlled with Sizes',
        description: 'A controlled dropdown showing the selected value. Sizes available: small, medium, large.',
        demo: (
          <div className="space-y-m">
            <DropdownControlledDemo />
            <div className="flex flex-wrap items-start gap-s">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Dropdown
                  key={size}
                  size={size}
                  options={[
                    { value: 'a', label: 'Option A' },
                    { value: 'b', label: 'Option B' },
                    { value: 'c', label: 'Option C' },
                  ]}
                  placeholder={size}
                />
              ))}
            </div>
          </div>
        ),
        code: `const [value, setValue] = useState('');

<Dropdown
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Choose a framework"
/>

<Dropdown size="small" options={...} placeholder="Small" />
<Dropdown size="medium" options={...} placeholder="Medium" />
<Dropdown size="large" options={...} placeholder="Large" />`,
      },
      {
        title: 'With Disabled Options',
        description: 'Individual options can be disabled.',
        demo: (
          <Dropdown
            options={[
              { value: 'free', label: 'Free Plan' },
              { value: 'pro', label: 'Pro Plan' },
              { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
            ]}
            placeholder="Select a plan"
          />
        ),
        code: `<Dropdown
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
  ]}
  placeholder="Select a plan"
/>`,
      },
    ],
  },

  InfoLabel: {
    name: 'InfoLabel',
    description: 'A label with an info icon that reveals additional context in a popover.',
    examples: [
      {
        title: 'Basic InfoLabel',
        description: 'Click the info icon to see additional details.',
        demo: (
          <div className="space-y-m">
            <InfoLabel info="This field is required for account creation.">
              Username
            </InfoLabel>
            <InfoLabel info="We'll never share your email with anyone else.">
              Email Address
            </InfoLabel>
          </div>
        ),
        code: `<InfoLabel info="This field is required for account creation.">
  Username
</InfoLabel>

<InfoLabel info="We'll never share your email with anyone else.">
  Email Address
</InfoLabel>`,
      },
      {
        title: 'With Rich Content',
        description: 'The info popover can contain rich content.',
        demo: (
          <InfoLabel
            info={
              <div className="space-y-xs">
                <p className="font-medium">Password Requirements</p>
                <ul className="list-disc pl-m text-200">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
            }
          >
            Password
          </InfoLabel>
        ),
        code: `<InfoLabel
  info={
    <div>
      <p className="font-medium">Password Requirements</p>
      <ul>
        <li>At least 8 characters</li>
        <li>One uppercase letter</li>
        <li>One number</li>
        <li>One special character</li>
      </ul>
    </div>
  }
>
  Password
</InfoLabel>`,
      },
    ],
  },
};
