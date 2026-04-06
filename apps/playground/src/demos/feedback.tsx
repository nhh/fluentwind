import { useState } from 'react';
import {
  Spinner,
  ProgressBar,
  Alert,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  MessageBarActions,
  ToastProvider,
  Toaster,
  useToast,
  Button,
  Popconfirm,
} from '@fluentwind/react';
import type { ComponentPageProps } from '../components/ComponentPage';

/* ── Toast helpers ── */
function ToastDemoInner() {
  const { dispatchToast } = useToast();
  return (
    <div className="flex flex-wrap gap-s">
      <Button onClick={() => dispatchToast('Operation completed successfully!', { intent: 'success' })}>
        Success Toast
      </Button>
      <Button onClick={() => dispatchToast('Something went wrong.', { intent: 'error' })}>
        Error Toast
      </Button>
      <Button onClick={() => dispatchToast('Please check your input.', { intent: 'warning' })}>
        Warning Toast
      </Button>
      <Button onClick={() => dispatchToast('Here is some useful information.', { intent: 'info' })}>
        Info Toast
      </Button>
    </div>
  );
}

function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoInner />
      <Toaster />
    </ToastProvider>
  );
}

function ToastPositionDemo() {
  return (
    <ToastProvider>
      <ToastPositionInner />
      <Toaster />
    </ToastProvider>
  );
}

function ToastPositionInner() {
  const { dispatchToast } = useToast();
  return (
    <div className="flex flex-wrap gap-s">
      <Button onClick={() => dispatchToast('Top notification', { intent: 'info', position: 'top' })}>
        Top
      </Button>
      <Button onClick={() => dispatchToast('Top-end notification', { intent: 'info', position: 'top-end' })}>
        Top End
      </Button>
      <Button onClick={() => dispatchToast('Bottom notification', { intent: 'info', position: 'bottom' })}>
        Bottom
      </Button>
      <Button onClick={() => dispatchToast('Bottom-end notification', { intent: 'info', position: 'bottom-end' })}>
        Bottom End
      </Button>
    </div>
  );
}

/* ── Alert helper ── */
function ClosableAlertDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <Button onClick={() => setVisible(true)}>Show Alert Again</Button>
    );
  }
  return (
    <Alert intent="warning" onClose={() => setVisible(false)}>
      This is a closable warning alert. Click the close button to dismiss it.
    </Alert>
  );
}

/* ── Popconfirm helper ── */
function PopconfirmDemo() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <div className="space-y-s">
      <Popconfirm
        title="Delete this item?"
        description="This action cannot be undone."
        onConfirm={() => setResult('Confirmed!')}
        onCancel={() => setResult('Cancelled.')}
      >
        <Button>Delete Item</Button>
      </Popconfirm>
      {result && <p className="text-200 text-neutral-foreground-2">{result}</p>}
    </div>
  );
}

export const feedbackDemos: Record<string, ComponentPageProps> = {
  Spinner: {
    name: 'Spinner',
    description: 'An animated loading indicator to inform users that content is being loaded.',
    examples: [
      {
        title: 'Sizes',
        description: 'Spinners are available in multiple sizes.',
        demo: (
          <div className="flex items-center gap-l">
            <Spinner size="tiny" />
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
            <Spinner size="extraLarge" />
          </div>
        ),
        code: `<Spinner size="tiny" />
<Spinner size="small" />
<Spinner size="medium" />
<Spinner size="large" />
<Spinner size="extraLarge" />`,
      },
      {
        title: 'Appearances',
        description: 'Primary and inverted appearances.',
        demo: (
          <div className="flex items-center gap-l">
            <Spinner appearance="primary" size="medium" />
            <div className="bg-brand-background rounded-medium p-m">
              <Spinner appearance="inverted" size="medium" />
            </div>
          </div>
        ),
        code: `<Spinner appearance="primary" size="medium" />

<div className="bg-brand-background p-m">
  <Spinner appearance="inverted" size="medium" />
</div>`,
      },
      {
        title: 'With Label',
        description: 'Display a label alongside the spinner.',
        demo: (
          <div className="space-y-m">
            <Spinner label="Loading..." labelPosition="after" />
            <Spinner label="Please wait" labelPosition="below" />
          </div>
        ),
        code: `<Spinner label="Loading..." labelPosition="after" />
<Spinner label="Please wait" labelPosition="below" />`,
      },
    ],
  },

  ProgressBar: {
    name: 'ProgressBar',
    description: 'Displays the completion progress of a task as a horizontal bar.',
    examples: [
      {
        title: 'Determinate',
        description: 'Shows a specific progress value.',
        demo: (
          <div className="space-y-m">
            <ProgressBar value={0.25} />
            <ProgressBar value={0.5} />
            <ProgressBar value={0.75} />
            <ProgressBar value={1} />
          </div>
        ),
        code: `<ProgressBar value={0.25} />
<ProgressBar value={0.5} />
<ProgressBar value={0.75} />
<ProgressBar value={1} />`,
      },
      {
        title: 'Colors / Intents',
        description: 'Different colors communicate different states.',
        demo: (
          <div className="space-y-m">
            <ProgressBar value={0.6} color="brand" />
            <ProgressBar value={0.6} color="success" />
            <ProgressBar value={0.6} color="warning" />
            <ProgressBar value={0.6} color="error" />
          </div>
        ),
        code: `<ProgressBar value={0.6} color="brand" />
<ProgressBar value={0.6} color="success" />
<ProgressBar value={0.6} color="warning" />
<ProgressBar value={0.6} color="error" />`,
      },
      {
        title: 'Thickness and Indeterminate',
        description: 'Medium and large thickness. Omit value for an indeterminate bar.',
        demo: (
          <div className="space-y-m">
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">Medium thickness</p>
              <ProgressBar value={0.4} thickness="medium" />
            </div>
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">Large thickness</p>
              <ProgressBar value={0.4} thickness="large" />
            </div>
            <div>
              <p className="text-200 text-neutral-foreground-3 mb-xs">Indeterminate</p>
              <ProgressBar />
            </div>
          </div>
        ),
        code: `<ProgressBar value={0.4} thickness="medium" />
<ProgressBar value={0.4} thickness="large" />

{/* Indeterminate - no value prop */}
<ProgressBar />`,
      },
    ],
  },

  Alert: {
    name: 'Alert',
    description: 'Displays a prominent message and optional actions.',
    examples: [
      {
        title: 'Intents',
        description: 'Alerts support info, success, warning, and error intents.',
        demo: (
          <div className="space-y-s">
            <Alert intent="info">This is an informational alert.</Alert>
            <Alert intent="success">Operation completed successfully!</Alert>
            <Alert intent="warning">Please review the changes before submitting.</Alert>
            <Alert intent="error">An error occurred while saving your data.</Alert>
          </div>
        ),
        code: `<Alert intent="info">This is an informational alert.</Alert>
<Alert intent="success">Operation completed successfully!</Alert>
<Alert intent="warning">Please review the changes before submitting.</Alert>
<Alert intent="error">An error occurred while saving your data.</Alert>`,
      },
      {
        title: 'With Action and Closable',
        description: 'Alerts can include action buttons and a close button.',
        demo: (
          <div className="space-y-s">
            <Alert intent="info" action={<Button size="small">Learn More</Button>}>
              A new version is available.
            </Alert>
            <ClosableAlertDemo />
          </div>
        ),
        code: `<Alert intent="info" action={<Button size="small">Learn More</Button>}>
  A new version is available.
</Alert>

<Alert intent="warning" onClose={() => setVisible(false)}>
  This is a closable warning alert.
</Alert>`,
      },
      {
        title: 'Inverted Appearance',
        description: 'Inverted alerts use stronger background colors.',
        demo: (
          <div className="space-y-s">
            <Alert intent="info" appearance="inverted">Inverted info alert.</Alert>
            <Alert intent="success" appearance="inverted">Inverted success alert.</Alert>
            <Alert intent="warning" appearance="inverted">Inverted warning alert.</Alert>
            <Alert intent="error" appearance="inverted">Inverted error alert.</Alert>
          </div>
        ),
        code: `<Alert intent="info" appearance="inverted">Inverted info alert.</Alert>
<Alert intent="success" appearance="inverted">Inverted success alert.</Alert>
<Alert intent="warning" appearance="inverted">Inverted warning alert.</Alert>
<Alert intent="error" appearance="inverted">Inverted error alert.</Alert>`,
      },
    ],
  },

  MessageBar: {
    name: 'MessageBar',
    description: 'A message bar for displaying contextual messages with optional title and actions.',
    examples: [
      {
        title: 'With Body and Title',
        description: 'MessageBar with a title and body text.',
        demo: (
          <div className="space-y-s">
            <MessageBar intent="info">
              <MessageBarBody>
                <MessageBarTitle>Information</MessageBarTitle>
                Your settings have been saved.
              </MessageBarBody>
            </MessageBar>
            <MessageBar intent="success">
              <MessageBarBody>
                <MessageBarTitle>Success</MessageBarTitle>
                The file was uploaded successfully.
              </MessageBarBody>
            </MessageBar>
          </div>
        ),
        code: `<MessageBar intent="info">
  <MessageBarBody>
    <MessageBarTitle>Information</MessageBarTitle>
    Your settings have been saved.
  </MessageBarBody>
</MessageBar>

<MessageBar intent="success">
  <MessageBarBody>
    <MessageBarTitle>Success</MessageBarTitle>
    The file was uploaded successfully.
  </MessageBarBody>
</MessageBar>`,
      },
      {
        title: 'Intents',
        description: 'All available intents.',
        demo: (
          <div className="space-y-s">
            {(['info', 'success', 'warning', 'error'] as const).map((intent) => (
              <MessageBar key={intent} intent={intent}>
                <MessageBarBody>
                  This is a {intent} message bar.
                </MessageBarBody>
              </MessageBar>
            ))}
          </div>
        ),
        code: `<MessageBar intent="info">
  <MessageBarBody>This is a info message bar.</MessageBarBody>
</MessageBar>
<MessageBar intent="success">...</MessageBar>
<MessageBar intent="warning">...</MessageBar>
<MessageBar intent="error">...</MessageBar>`,
      },
      {
        title: 'With Actions',
        description: 'MessageBar can include action buttons.',
        demo: (
          <MessageBar intent="warning">
            <MessageBarBody>
              <MessageBarTitle>Update Available</MessageBarTitle>
              A new version of the application is ready to install.
            </MessageBarBody>
            <MessageBarActions>
              <Button size="small">Update Now</Button>
              <Button size="small" appearance="subtle">Dismiss</Button>
            </MessageBarActions>
          </MessageBar>
        ),
        code: `<MessageBar intent="warning">
  <MessageBarBody>
    <MessageBarTitle>Update Available</MessageBarTitle>
    A new version of the application is ready to install.
  </MessageBarBody>
  <MessageBarActions>
    <Button size="small">Update Now</Button>
    <Button size="small" appearance="subtle">Dismiss</Button>
  </MessageBarActions>
</MessageBar>`,
      },
    ],
  },

  Toast: {
    name: 'Toast',
    description: 'Brief, non-intrusive notifications that appear temporarily.',
    examples: [
      {
        title: 'Basic Toast',
        description: 'Click a button to dispatch toasts with different intents.',
        demo: <ToastDemo />,
        code: `function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoInner />
      <Toaster />
    </ToastProvider>
  );
}

function ToastDemoInner() {
  const { dispatchToast } = useToast();
  return (
    <div className="flex gap-s">
      <Button onClick={() => dispatchToast('Operation completed!', { intent: 'success' })}>
        Success
      </Button>
      <Button onClick={() => dispatchToast('Something went wrong.', { intent: 'error' })}>
        Error
      </Button>
    </div>
  );
}`,
      },
      {
        title: 'Positions',
        description: 'Toasts can appear at different positions on the screen.',
        demo: <ToastPositionDemo />,
        code: `const { dispatchToast } = useToast();

<Button onClick={() => dispatchToast('Top', { intent: 'info', position: 'top' })}>
  Top
</Button>
<Button onClick={() => dispatchToast('Top-end', { intent: 'info', position: 'top-end' })}>
  Top End
</Button>
<Button onClick={() => dispatchToast('Bottom', { intent: 'info', position: 'bottom' })}>
  Bottom
</Button>`,
      },
    ],
  },

  Popconfirm: {
    name: 'Popconfirm',
    description: 'A compact confirmation dialog that appears near the trigger element.',
    examples: [
      {
        title: 'Basic Popconfirm',
        description: 'Click the button to show a confirmation popover.',
        demo: <PopconfirmDemo />,
        code: `const [result, setResult] = useState<string | null>(null);

<Popconfirm
  title="Delete this item?"
  description="This action cannot be undone."
  onConfirm={() => setResult('Confirmed!')}
  onCancel={() => setResult('Cancelled.')}
>
  <Button>Delete Item</Button>
</Popconfirm>`,
      },
      {
        title: 'Custom Button Text',
        description: 'Customize the confirm and cancel button labels.',
        demo: (
          <Popconfirm
            title="Discard changes?"
            description="All unsaved progress will be lost."
            confirmText="Yes, discard"
            cancelText="Keep editing"
          >
            <Button>Discard</Button>
          </Popconfirm>
        ),
        code: `<Popconfirm
  title="Discard changes?"
  description="All unsaved progress will be lost."
  confirmText="Yes, discard"
  cancelText="Keep editing"
>
  <Button>Discard</Button>
</Popconfirm>`,
      },
      {
        title: 'Positioning',
        description: 'The popconfirm can be positioned in different directions.',
        demo: (
          <div className="flex flex-wrap gap-s">
            {(['above', 'below', 'before', 'after'] as const).map((pos) => (
              <Popconfirm key={pos} title={`Position: ${pos}`} position={pos}>
                <Button>{pos}</Button>
              </Popconfirm>
            ))}
          </div>
        ),
        code: `<Popconfirm title="Position: above" position="above">
  <Button>above</Button>
</Popconfirm>
<Popconfirm title="Position: below" position="below">
  <Button>below</Button>
</Popconfirm>`,
      },
    ],
  },
};
