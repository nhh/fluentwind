import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  FloatButton,
  FloatButtonGroup,
} from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Accordion helpers ── */
function AccordionControlledDemo() {
  const [openItems, setOpenItems] = useState<string[]>(['item-1']);
  return (
    <div className="space-y-s">
      <p className="text-200 text-neutral-foreground-3">
        Open items: {openItems.length > 0 ? openItems.join(', ') : 'none'}
      </p>
      <Accordion openItems={openItems} onToggle={setOpenItems} multiple>
        <AccordionItem value="item-1">
          <AccordionHeader>Personal Information</AccordionHeader>
          <AccordionPanel>
            Manage your name, email, and contact information.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionHeader>Security Settings</AccordionHeader>
          <AccordionPanel>
            Update your password, enable two-factor authentication, and manage login sessions.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionHeader>Notification Preferences</AccordionHeader>
          <AccordionPanel>
            Control which notifications you receive and how they are delivered.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/* ── FloatButton helper ── */
function FloatButtonGroupDemo() {
  return (
    <div className="relative h-48 border border-neutral-stroke-2 rounded-medium bg-subtle-background">
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <FloatButtonGroup trigger="hover" shape="circle" type="primary">
          <FloatButton icon={<span>📝</span>} tooltip="Edit" />
          <FloatButton icon={<span>📤</span>} tooltip="Share" />
          <FloatButton icon={<span>🗑</span>} tooltip="Delete" />
        </FloatButtonGroup>
      </div>
    </div>
  );
}

export const layoutDemos: Record<string, ComponentPageProps> = {
  Accordion: {
    name: 'Accordion',
    description: 'A vertically stacked set of collapsible content sections.',
    examples: [
      {
        title: 'Basic Accordion',
        description: 'A single-expand accordion where only one item can be open at a time.',
        demo: (
          <Accordion defaultOpenItems={['faq-1']}>
            <AccordionItem value="faq-1">
              <AccordionHeader>What is FluentWind?</AccordionHeader>
              <AccordionPanel>
                FluentWind is a Tailwind CSS-based component library inspired by Fluent UI design principles.
                It provides accessible, themeable components for building modern web applications.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionHeader>How do I install it?</AccordionHeader>
              <AccordionPanel>
                Install the packages via npm or pnpm: <code>pnpm add @fluentwind/react @fluentwind/tokens</code>.
                Then wrap your app with the FluentWindProvider.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionHeader>Is it accessible?</AccordionHeader>
              <AccordionPanel>
                Yes! All components follow WAI-ARIA patterns and support keyboard navigation.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ),
        code: `<Accordion defaultOpenItems={['faq-1']}>
  <AccordionItem value="faq-1">
    <AccordionHeader>What is FluentWind?</AccordionHeader>
    <AccordionPanel>
      FluentWind is a Tailwind CSS-based component library...
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="faq-2">
    <AccordionHeader>How do I install it?</AccordionHeader>
    <AccordionPanel>
      Install via npm or pnpm...
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="faq-3">
    <AccordionHeader>Is it accessible?</AccordionHeader>
    <AccordionPanel>
      Yes! All components follow WAI-ARIA patterns...
    </AccordionPanel>
  </AccordionItem>
</Accordion>`,
      },
      {
        title: 'Multiple Expand',
        description: 'Allow multiple items to be open simultaneously.',
        demo: (
          <Accordion multiple defaultOpenItems={['s-1', 's-2']}>
            <AccordionItem value="s-1">
              <AccordionHeader>Section One</AccordionHeader>
              <AccordionPanel>
                Content for section one. Multiple sections can be expanded at the same time.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="s-2">
              <AccordionHeader>Section Two</AccordionHeader>
              <AccordionPanel>
                Content for section two. Try opening all sections at once.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="s-3">
              <AccordionHeader>Section Three</AccordionHeader>
              <AccordionPanel>
                Content for section three.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ),
        code: `<Accordion multiple defaultOpenItems={['s-1', 's-2']}>
  <AccordionItem value="s-1">
    <AccordionHeader>Section One</AccordionHeader>
    <AccordionPanel>Content for section one.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="s-2">
    <AccordionHeader>Section Two</AccordionHeader>
    <AccordionPanel>Content for section two.</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="s-3">
    <AccordionHeader>Section Three</AccordionHeader>
    <AccordionPanel>Content for section three.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
      },
      {
        title: 'Controlled Accordion',
        description: 'Control which items are open with state.',
        demo: <AccordionControlledDemo />,
        code: `const [openItems, setOpenItems] = useState<string[]>(['item-1']);

<Accordion openItems={openItems} onToggle={setOpenItems} multiple>
  <AccordionItem value="item-1">
    <AccordionHeader>Personal Information</AccordionHeader>
    <AccordionPanel>Manage your name, email...</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionHeader>Security Settings</AccordionHeader>
    <AccordionPanel>Update your password...</AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionHeader>Notification Preferences</AccordionHeader>
    <AccordionPanel>Control notifications...</AccordionPanel>
  </AccordionItem>
</Accordion>`,
      },
    ],
  },

  FloatButton: {
    name: 'FloatButton',
    description: 'A floating action button for primary or frequently used actions.',
    examples: [
      {
        title: 'Basic FloatButton',
        description: 'A standalone float button. Shown here with relative positioning for the demo.',
        demo: (
          <div className="relative h-32 border border-neutral-stroke-2 rounded-medium bg-subtle-background">
            <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
              <FloatButton icon={<span>+</span>} type="primary" />
            </div>
          </div>
        ),
        code: `<FloatButton icon={<span>+</span>} type="primary" />`,
      },
      {
        title: 'Shapes and Types',
        description: 'Float buttons come in circle and square shapes, with default and primary types.',
        demo: (
          <div className="flex flex-wrap gap-m items-center">
            <FloatButton icon={<span>+</span>} shape="circle" type="default" />
            <FloatButton icon={<span>+</span>} shape="circle" type="primary" />
            <FloatButton icon={<span>+</span>} shape="square" type="default" />
            <FloatButton icon={<span>+</span>} shape="square" type="primary" />
          </div>
        ),
        code: `<FloatButton icon={<span>+</span>} shape="circle" type="default" />
<FloatButton icon={<span>+</span>} shape="circle" type="primary" />
<FloatButton icon={<span>+</span>} shape="square" type="default" />
<FloatButton icon={<span>+</span>} shape="square" type="primary" />`,
      },
      {
        title: 'FloatButtonGroup',
        description: 'A group of float buttons that expand on hover. Hover over the button in the bottom-right corner.',
        demo: <FloatButtonGroupDemo />,
        code: `<FloatButtonGroup trigger="hover" shape="circle" type="primary">
  <FloatButton icon={<span>📝</span>} tooltip="Edit" />
  <FloatButton icon={<span>📤</span>} tooltip="Share" />
  <FloatButton icon={<span>🗑</span>} tooltip="Delete" />
</FloatButtonGroup>`,
      },
    ],
  },
};
