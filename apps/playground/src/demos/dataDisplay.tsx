import { useState } from 'react';
import type { ComponentPageProps } from '../components/ComponentPage';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  Persona,
  Tag,
  Statistic,
  Empty,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  Tree,
  TreeItem,
  TreeItemLayout,
  Timeline,
  TimelineItem,
  Skeleton,
  SkeletonItem,
  Carousel,
  CarouselItem,
  Button,
  Text,
} from '@fluentwind/react';

function CarouselDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel activeIndex={activeIndex} onActiveIndexChange={setActiveIndex}>
      <CarouselItem>
        <div className="flex items-center justify-center h-[200px] bg-brand-background-2 text-brand-foreground-2 rounded-medium">
          <Text variant="title2">Slide 1</Text>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-[200px] bg-palette-green-background-2 text-palette-green-foreground-2 rounded-medium">
          <Text variant="title2">Slide 2</Text>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="flex items-center justify-center h-[200px] bg-palette-red-background-2 text-palette-red-foreground-2 rounded-medium">
          <Text variant="title2">Slide 3</Text>
        </div>
      </CarouselItem>
    </Carousel>
  );
}

export const dataDisplayDemos: Record<string, ComponentPageProps> = {
  Avatar: {
    name: 'Avatar',
    description: 'An avatar represents a person or entity, displaying their image, initials, or an icon.',
    examples: [
      {
        title: 'Sizes',
        description: 'Avatars come in multiple sizes to fit different contexts.',
        demo: (
          <div className="flex gap-s items-center">
            <Avatar name="Jane Doe" size={28} />
            <Avatar name="Jane Doe" size={32} />
            <Avatar name="Jane Doe" size={40} />
            <Avatar name="Jane Doe" size={56} />
            <Avatar name="Jane Doe" size={72} />
          </div>
        ),
        code: `<Avatar name="Jane Doe" size={28} />
<Avatar name="Jane Doe" size={32} />
<Avatar name="Jane Doe" size={40} />
<Avatar name="Jane Doe" size={56} />
<Avatar name="Jane Doe" size={72} />`,
      },
      {
        title: 'With Image & Initials',
        description: 'Avatars can display an image, auto-generated initials, or explicit initials.',
        demo: (
          <div className="flex gap-s items-center">
            <Avatar image={{ src: 'https://placehold.co/96x96/0078D4/white?text=JD', alt: 'Jane Doe' }} size={40} />
            <Avatar name="Alex Smith" size={40} />
            <Avatar initials="KW" size={40} />
          </div>
        ),
        code: `<Avatar image={{ src: "...", alt: "Jane Doe" }} size={40} />
<Avatar name="Alex Smith" size={40} />
<Avatar initials="KW" size={40} />`,
      },
      {
        title: 'Active State & Colors',
        description: 'Avatars can indicate active state and use different color variants.',
        demo: (
          <div className="flex gap-s items-center">
            <Avatar name="Active User" size={40} active="active" />
            <Avatar name="Inactive User" size={40} active="inactive" />
            <Avatar name="Brand Color" size={40} color="brand" />
            <Avatar name="Colorful" size={40} color="colorful" />
            <Avatar name="Neutral" size={40} color="neutral" />
          </div>
        ),
        code: `<Avatar name="Active User" size={40} active="active" />
<Avatar name="Inactive User" size={40} active="inactive" />
<Avatar name="Brand Color" size={40} color="brand" />
<Avatar name="Colorful" size={40} color="colorful" />`,
      },
      {
        title: 'Shapes',
        demo: (
          <div className="flex gap-s items-center">
            <Avatar name="Circular" size={40} shape="circular" />
            <Avatar name="Square" size={40} shape="square" />
          </div>
        ),
        code: `<Avatar name="Circular" size={40} shape="circular" />
<Avatar name="Square" size={40} shape="square" />`,
      },
    ],
  },

  AvatarGroup: {
    name: 'AvatarGroup',
    description: 'AvatarGroup displays a collection of avatars grouped together, with overflow handling.',
    examples: [
      {
        title: 'Basic Group',
        description: 'A group of avatars stacked together with an overflow indicator.',
        demo: (
          <AvatarGroup maxAvatars={3}>
            <Avatar name="Alice Johnson" />
            <Avatar name="Bob Smith" />
            <Avatar name="Carol Davis" />
            <Avatar name="Dan Wilson" />
            <Avatar name="Eve Martinez" />
          </AvatarGroup>
        ),
        code: `<AvatarGroup maxAvatars={3}>
  <Avatar name="Alice Johnson" />
  <Avatar name="Bob Smith" />
  <Avatar name="Carol Davis" />
  <Avatar name="Dan Wilson" />
  <Avatar name="Eve Martinez" />
</AvatarGroup>`,
      },
      {
        title: 'Layouts',
        description: 'Avatar groups support spread and stack layouts.',
        demo: (
          <div className="flex flex-col gap-m">
            <div>
              <Text variant="caption1" block>Stack (default)</Text>
              <AvatarGroup layout="stack" maxAvatars={4}>
                <Avatar name="Alice Johnson" />
                <Avatar name="Bob Smith" />
                <Avatar name="Carol Davis" />
                <Avatar name="Dan Wilson" />
                <Avatar name="Eve Martinez" />
              </AvatarGroup>
            </div>
            <div>
              <Text variant="caption1" block>Spread</Text>
              <AvatarGroup layout="spread" maxAvatars={4}>
                <Avatar name="Alice Johnson" />
                <Avatar name="Bob Smith" />
                <Avatar name="Carol Davis" />
                <Avatar name="Dan Wilson" />
                <Avatar name="Eve Martinez" />
              </AvatarGroup>
            </div>
          </div>
        ),
        code: `<AvatarGroup layout="stack" maxAvatars={4}>
  <Avatar name="Alice Johnson" />
  <Avatar name="Bob Smith" />
  ...
</AvatarGroup>

<AvatarGroup layout="spread" maxAvatars={4}>
  ...
</AvatarGroup>`,
      },
    ],
  },

  Badge: {
    name: 'Badge',
    description: 'A badge is used to display a small piece of information, such as a status or count.',
    examples: [
      {
        title: 'Appearances',
        description: 'Badges support filled, ghost, outline, and tint appearances.',
        demo: (
          <div className="flex gap-s items-center flex-wrap">
            <Badge appearance="filled">Filled</Badge>
            <Badge appearance="ghost">Ghost</Badge>
            <Badge appearance="outline">Outline</Badge>
            <Badge appearance="tint">Tint</Badge>
          </div>
        ),
        code: `<Badge appearance="filled">Filled</Badge>
<Badge appearance="ghost">Ghost</Badge>
<Badge appearance="outline">Outline</Badge>
<Badge appearance="tint">Tint</Badge>`,
      },
      {
        title: 'Colors',
        description: 'Badges come in semantic colors for different statuses.',
        demo: (
          <div className="flex gap-s items-center flex-wrap">
            <Badge color="brand">Brand</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="informative">Informative</Badge>
            <Badge color="important">Important</Badge>
            <Badge color="subtle">Subtle</Badge>
          </div>
        ),
        code: `<Badge color="brand">Brand</Badge>
<Badge color="danger">Danger</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="informative">Informative</Badge>`,
      },
      {
        title: 'Sizes',
        description: 'Badges range from tiny to extra-large.',
        demo: (
          <div className="flex gap-s items-center flex-wrap">
            <Badge size="tiny" color="brand">Tiny</Badge>
            <Badge size="extraSmall" color="brand">Extra Small</Badge>
            <Badge size="small" color="brand">Small</Badge>
            <Badge size="medium" color="brand">Medium</Badge>
            <Badge size="large" color="brand">Large</Badge>
            <Badge size="extraLarge" color="brand">Extra Large</Badge>
          </div>
        ),
        code: `<Badge size="tiny">Tiny</Badge>
<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
<Badge size="large">Large</Badge>
<Badge size="extraLarge">Extra Large</Badge>`,
      },
    ],
  },

  Card: {
    name: 'Card',
    description: 'A card is a container that groups related content and actions about a single subject.',
    examples: [
      {
        title: 'Basic Card',
        description: 'A simple card with text content.',
        demo: (
          <div className="flex gap-m flex-wrap">
            <Card style={{ width: 300 }}>
              <Text variant="subtitle2" block>Card Title</Text>
              <Text variant="body1">This is a basic card with some content inside it. Cards group related information together.</Text>
            </Card>
          </div>
        ),
        code: `<Card>
  <Text variant="subtitle2" block>Card Title</Text>
  <Text variant="body1">This is a basic card with some content.</Text>
</Card>`,
      },
      {
        title: 'Appearances',
        description: 'Cards support filled, outline, subtle, and filled alternative appearances.',
        demo: (
          <div className="flex gap-m flex-wrap">
            <Card appearance="filled" style={{ width: 200 }}>
              <Text variant="caption1" block>Filled</Text>
              <Text variant="body1">Card content</Text>
            </Card>
            <Card appearance="outline" style={{ width: 200 }}>
              <Text variant="caption1" block>Outline</Text>
              <Text variant="body1">Card content</Text>
            </Card>
            <Card appearance="subtle" style={{ width: 200 }}>
              <Text variant="caption1" block>Subtle</Text>
              <Text variant="body1">Card content</Text>
            </Card>
            <Card appearance="filledAlternative" style={{ width: 200 }}>
              <Text variant="caption1" block>Filled Alt</Text>
              <Text variant="body1">Card content</Text>
            </Card>
          </div>
        ),
        code: `<Card appearance="filled">...</Card>
<Card appearance="outline">...</Card>
<Card appearance="subtle">...</Card>
<Card appearance="filledAlternative">...</Card>`,
      },
      {
        title: 'Sizes',
        description: 'Cards come in small, medium, and large sizes with different padding.',
        demo: (
          <div className="flex gap-m flex-wrap items-start">
            <Card size="small" style={{ width: 200 }}>
              <Text variant="caption1" block>Small</Text>
              <Text variant="body1">Less padding</Text>
            </Card>
            <Card size="medium" style={{ width: 200 }}>
              <Text variant="caption1" block>Medium</Text>
              <Text variant="body1">Default padding</Text>
            </Card>
            <Card size="large" style={{ width: 200 }}>
              <Text variant="caption1" block>Large</Text>
              <Text variant="body1">More padding</Text>
            </Card>
          </div>
        ),
        code: `<Card size="small">...</Card>
<Card size="medium">...</Card>
<Card size="large">...</Card>`,
      },
    ],
  },

  Persona: {
    name: 'Persona',
    description: 'Persona displays a user or entity with their avatar, name, and additional details.',
    examples: [
      {
        title: 'Basic Persona',
        description: 'Persona with avatar, name, and secondary text.',
        demo: (
          <div className="flex flex-col gap-m">
            <Persona
              name="Jane Doe"
              secondaryText="Software Engineer"
              avatar={<Avatar name="Jane Doe" size={32} />}
            />
            <Persona
              name="Alex Smith"
              secondaryText="Product Manager"
              tertiaryText="Available"
              avatar={<Avatar name="Alex Smith" size={32} />}
            />
          </div>
        ),
        code: `<Persona
  name="Jane Doe"
  secondaryText="Software Engineer"
  avatar={<Avatar name="Jane Doe" size={32} />}
/>`,
      },
      {
        title: 'Sizes',
        description: 'Personas support different sizes for various contexts.',
        demo: (
          <div className="flex flex-col gap-m">
            <Persona
              size="small"
              name="Small Persona"
              secondaryText="Caption text"
              avatar={<Avatar name="Small Persona" size={24} />}
            />
            <Persona
              size="medium"
              name="Medium Persona"
              secondaryText="Description text"
              avatar={<Avatar name="Medium Persona" size={32} />}
            />
            <Persona
              size="large"
              name="Large Persona"
              secondaryText="Detailed description"
              tertiaryText="Additional info"
              avatar={<Avatar name="Large Persona" size={40} />}
            />
            <Persona
              size="extraLarge"
              name="Extra Large Persona"
              secondaryText="Full description here"
              tertiaryText="Department: Engineering"
              quaternaryText="Location: San Francisco"
              avatar={<Avatar name="Extra Large Persona" size={56} />}
            />
          </div>
        ),
        code: `<Persona size="small" name="Small" avatar={<Avatar name="Small" size={24} />} />
<Persona size="medium" name="Medium" avatar={<Avatar name="Medium" size={32} />} />
<Persona size="large" name="Large" avatar={<Avatar name="Large" size={40} />} />
<Persona size="extraLarge" name="Extra Large" avatar={<Avatar name="XL" size={56} />} />`,
      },
    ],
  },

  Tag: {
    name: 'Tag',
    description: 'Tags classify content with keywords, labels, or categories.',
    examples: [
      {
        title: 'Appearances',
        description: 'Tags support filled, outline, and brand appearances.',
        demo: (
          <div className="flex gap-s items-center flex-wrap">
            <Tag appearance="filled">Filled</Tag>
            <Tag appearance="outline">Outline</Tag>
            <Tag appearance="brand">Brand</Tag>
          </div>
        ),
        code: `<Tag appearance="filled">Filled</Tag>
<Tag appearance="outline">Outline</Tag>
<Tag appearance="brand">Brand</Tag>`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex gap-s items-center">
            <Tag size="small">Small</Tag>
            <Tag size="medium">Medium</Tag>
            <Tag size="large">Large</Tag>
          </div>
        ),
        code: `<Tag size="small">Small</Tag>
<Tag size="medium">Medium</Tag>
<Tag size="large">Large</Tag>`,
      },
      {
        title: 'Dismissible & Shapes',
        description: 'Tags can be dismissible and have different shapes.',
        demo: (
          <div className="flex gap-s items-center flex-wrap">
            <Tag dismissible onDismiss={() => {}}>Dismissible</Tag>
            <Tag shape="rounded">Rounded</Tag>
            <Tag shape="circular">Circular</Tag>
            <Tag disabled>Disabled</Tag>
          </div>
        ),
        code: `<Tag dismissible onDismiss={() => {}}>Dismissible</Tag>
<Tag shape="rounded">Rounded</Tag>
<Tag shape="circular">Circular</Tag>
<Tag disabled>Disabled</Tag>`,
      },
    ],
  },

  Statistic: {
    name: 'Statistic',
    description: 'Statistic displays a numerical value with optional label, prefix, suffix, and trend indicator.',
    examples: [
      {
        title: 'Basic Statistics',
        description: 'Display key metrics with labels.',
        demo: (
          <div className="flex gap-xl flex-wrap">
            <Statistic title="Total Users" value="12,345" />
            <Statistic title="Revenue" value="$48,200" />
            <Statistic title="Conversion" value="3.6%" />
          </div>
        ),
        code: `<Statistic title="Total Users" value="12,345" />
<Statistic title="Revenue" value="$48,200" />
<Statistic title="Conversion" value="3.6%" />`,
      },
      {
        title: 'With Prefix, Suffix & Trend',
        description: 'Statistics can show trends and additional context.',
        demo: (
          <div className="flex gap-xl flex-wrap">
            <Statistic title="Revenue" prefix="$" value="48,200" suffix="USD" />
            <Statistic title="Growth" value="12.5" suffix="%" trend="up" trendValue="2.1%" />
            <Statistic title="Churn" value="3.2" suffix="%" trend="down" trendValue="0.5%" />
          </div>
        ),
        code: `<Statistic title="Revenue" prefix="$" value="48,200" suffix="USD" />
<Statistic title="Growth" value="12.5" suffix="%" trend="up" trendValue="2.1%" />
<Statistic title="Churn" value="3.2" suffix="%" trend="down" trendValue="0.5%" />`,
      },
      {
        title: 'Sizes',
        demo: (
          <div className="flex gap-xl items-end flex-wrap">
            <Statistic title="Small" value="1,234" size="small" />
            <Statistic title="Medium" value="1,234" size="medium" />
            <Statistic title="Large" value="1,234" size="large" />
          </div>
        ),
        code: `<Statistic title="Small" value="1,234" size="small" />
<Statistic title="Medium" value="1,234" size="medium" />
<Statistic title="Large" value="1,234" size="large" />`,
      },
    ],
  },

  Empty: {
    name: 'Empty',
    description: 'Empty state is displayed when there is no data or content to show.',
    examples: [
      {
        title: 'Default Empty State',
        demo: (
          <Empty description="No data available" />
        ),
        code: `<Empty description="No data available" />`,
      },
      {
        title: 'Custom Description',
        description: 'Empty state with a descriptive message.',
        demo: (
          <Empty description="No results match your search. Try adjusting your filters." />
        ),
        code: `<Empty description="No results match your search. Try adjusting your filters." />`,
      },
      {
        title: 'With Action',
        description: 'Empty state with an action button for users to take next steps.',
        demo: (
          <Empty description="You have no projects yet.">
            <Button appearance="primary">Create Project</Button>
          </Empty>
        ),
        code: `<Empty description="You have no projects yet.">
  <Button appearance="primary">Create Project</Button>
</Empty>`,
      },
    ],
  },

  Table: {
    name: 'Table',
    description: 'Tables display structured data in rows and columns for easy scanning and comparison.',
    examples: [
      {
        title: 'Basic Table',
        description: 'A simple data table with headers and rows.',
        demo: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jane Doe</TableCell>
                <TableCell><Badge color="success" size="small">Active</Badge></TableCell>
                <TableCell>Mar 15, 2026</TableCell>
                <TableCell>Engineer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alex Smith</TableCell>
                <TableCell><Badge color="warning" size="small">Away</Badge></TableCell>
                <TableCell>Mar 12, 2026</TableCell>
                <TableCell>Designer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol Davis</TableCell>
                <TableCell><Badge color="success" size="small">Active</Badge></TableCell>
                <TableCell>Mar 10, 2026</TableCell>
                <TableCell>Manager</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Wilson</TableCell>
                <TableCell><Badge color="danger" size="small">Offline</Badge></TableCell>
                <TableCell>Mar 8, 2026</TableCell>
                <TableCell>Analyst</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
      <TableHeaderCell>Date</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jane Doe</TableCell>
      <TableCell><Badge color="success" size="small">Active</Badge></TableCell>
      <TableCell>Mar 15, 2026</TableCell>
    </TableRow>
    ...
  </TableBody>
</Table>`,
      },
      {
        title: 'Sortable Columns',
        description: 'Table header cells can indicate sort direction.',
        demo: (
          <Table sortable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell sortable sortDirection="ascending">Name</TableHeaderCell>
                <TableHeaderCell sortable>Status</TableHeaderCell>
                <TableHeaderCell sortable>Date</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice Johnson</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Apr 1, 2026</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Smith</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell>Mar 28, 2026</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol White</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Mar 25, 2026</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
        code: `<Table sortable>
  <TableHeader>
    <TableRow>
      <TableHeaderCell sortable sortDirection="ascending">Name</TableHeaderCell>
      <TableHeaderCell sortable>Status</TableHeaderCell>
      <TableHeaderCell sortable>Date</TableHeaderCell>
    </TableRow>
  </TableHeader>
  <TableBody>...</TableBody>
</Table>`,
      },
    ],
  },

  List: {
    name: 'List',
    description: 'Lists display a set of related items in a vertical layout.',
    examples: [
      {
        title: 'Basic List',
        description: 'A simple list with primary and secondary text.',
        demo: (
          <List>
            <ListItem secondaryText="Software Engineer">Jane Doe</ListItem>
            <ListItem secondaryText="Product Manager">Alex Smith</ListItem>
            <ListItem secondaryText="UX Designer">Carol Davis</ListItem>
          </List>
        ),
        code: `<List>
  <ListItem secondaryText="Software Engineer">Jane Doe</ListItem>
  <ListItem secondaryText="Product Manager">Alex Smith</ListItem>
  <ListItem secondaryText="UX Designer">Carol Davis</ListItem>
</List>`,
      },
      {
        title: 'With Media & Actions',
        description: 'List items can have leading media and trailing actions.',
        demo: (
          <List navigable>
            <ListItem
              media={<Avatar name="Jane Doe" size={32} />}
              secondaryText="Last active 2 hours ago"
              action={<Badge color="success" size="small">Online</Badge>}
            >
              Jane Doe
            </ListItem>
            <ListItem
              media={<Avatar name="Alex Smith" size={32} />}
              secondaryText="Last active 1 day ago"
              action={<Badge color="warning" size="small">Away</Badge>}
            >
              Alex Smith
            </ListItem>
            <ListItem
              media={<Avatar name="Carol Davis" size={32} />}
              secondaryText="Last active 3 days ago"
              action={<Badge color="danger" size="small">Offline</Badge>}
            >
              Carol Davis
            </ListItem>
          </List>
        ),
        code: `<List navigable>
  <ListItem
    media={<Avatar name="Jane Doe" size={32} />}
    secondaryText="Last active 2 hours ago"
    action={<Badge color="success" size="small">Online</Badge>}
  >
    Jane Doe
  </ListItem>
  ...
</List>`,
      },
    ],
  },

  Tree: {
    name: 'Tree',
    description: 'Tree displays hierarchical data in an expandable and collapsible structure.',
    examples: [
      {
        title: 'Basic Tree',
        description: 'A tree with two levels of nesting.',
        demo: (
          <Tree defaultOpenItems={['documents', 'images']}>
            <TreeItem value="documents">
              <TreeItemLayout>Documents</TreeItemLayout>
              <Tree>
                <TreeItem value="report" leaf>
                  <TreeItemLayout>Annual Report.pdf</TreeItemLayout>
                </TreeItem>
                <TreeItem value="proposal" leaf>
                  <TreeItemLayout>Project Proposal.docx</TreeItemLayout>
                </TreeItem>
                <TreeItem value="notes" leaf>
                  <TreeItemLayout>Meeting Notes.txt</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem value="images">
              <TreeItemLayout>Images</TreeItemLayout>
              <Tree>
                <TreeItem value="photo1" leaf>
                  <TreeItemLayout>vacation.jpg</TreeItemLayout>
                </TreeItem>
                <TreeItem value="photo2" leaf>
                  <TreeItemLayout>profile.png</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem value="readme" leaf>
              <TreeItemLayout>README.md</TreeItemLayout>
            </TreeItem>
          </Tree>
        ),
        code: `<Tree defaultOpenItems={['documents', 'images']}>
  <TreeItem value="documents">
    <TreeItemLayout>Documents</TreeItemLayout>
    <Tree>
      <TreeItem value="report" leaf>
        <TreeItemLayout>Annual Report.pdf</TreeItemLayout>
      </TreeItem>
      <TreeItem value="proposal" leaf>
        <TreeItemLayout>Project Proposal.docx</TreeItemLayout>
      </TreeItem>
    </Tree>
  </TreeItem>
  <TreeItem value="images">
    <TreeItemLayout>Images</TreeItemLayout>
    <Tree>
      <TreeItem value="photo1" leaf>
        <TreeItemLayout>vacation.jpg</TreeItemLayout>
      </TreeItem>
    </Tree>
  </TreeItem>
  <TreeItem value="readme" leaf>
    <TreeItemLayout>README.md</TreeItemLayout>
  </TreeItem>
</Tree>`,
      },
    ],
  },

  Timeline: {
    name: 'Timeline',
    description: 'Timeline displays a chronological sequence of events or activities.',
    examples: [
      {
        title: 'Basic Timeline',
        description: 'A timeline showing project milestones.',
        demo: (
          <Timeline>
            <TimelineItem color="success" label="Mar 1, 2026">
              <Text variant="body1Strong" block>Project Kickoff</Text>
              <Text variant="body1">Initial planning and team formation completed.</Text>
            </TimelineItem>
            <TimelineItem color="brand" label="Mar 15, 2026">
              <Text variant="body1Strong" block>Design Phase</Text>
              <Text variant="body1">UI/UX designs approved by stakeholders.</Text>
            </TimelineItem>
            <TimelineItem color="warning" label="Apr 1, 2026">
              <Text variant="body1Strong" block>Development Sprint</Text>
              <Text variant="body1">Core features under active development.</Text>
            </TimelineItem>
            <TimelineItem color="neutral" label="Apr 30, 2026">
              <Text variant="body1Strong" block>Launch</Text>
              <Text variant="body1">Public release planned.</Text>
            </TimelineItem>
          </Timeline>
        ),
        code: `<Timeline>
  <TimelineItem color="success" label="Mar 1, 2026">
    <Text variant="body1Strong" block>Project Kickoff</Text>
    <Text variant="body1">Initial planning completed.</Text>
  </TimelineItem>
  <TimelineItem color="brand" label="Mar 15, 2026">
    <Text variant="body1Strong" block>Design Phase</Text>
    <Text variant="body1">Designs approved.</Text>
  </TimelineItem>
  <TimelineItem color="warning" label="Apr 1, 2026">
    <Text variant="body1Strong" block>Development Sprint</Text>
    <Text variant="body1">Core features in progress.</Text>
  </TimelineItem>
</Timeline>`,
      },
      {
        title: 'Alternate Layout',
        description: 'Timeline items alternate between left and right.',
        demo: (
          <Timeline mode="alternate">
            <TimelineItem color="success" label="Step 1">
              <Text variant="body1">Requirements gathered</Text>
            </TimelineItem>
            <TimelineItem color="brand" label="Step 2">
              <Text variant="body1">Architecture defined</Text>
            </TimelineItem>
            <TimelineItem color="warning" label="Step 3">
              <Text variant="body1">Implementation started</Text>
            </TimelineItem>
            <TimelineItem color="danger" label="Step 4">
              <Text variant="body1">Testing and QA</Text>
            </TimelineItem>
          </Timeline>
        ),
        code: `<Timeline mode="alternate">
  <TimelineItem color="success" label="Step 1">
    <Text>Requirements gathered</Text>
  </TimelineItem>
  <TimelineItem color="brand" label="Step 2">
    <Text>Architecture defined</Text>
  </TimelineItem>
  ...
</Timeline>`,
      },
    ],
  },

  Skeleton: {
    name: 'Skeleton',
    description: 'Skeleton provides placeholder loading indicators while content is being fetched.',
    examples: [
      {
        title: 'Basic Shapes',
        description: 'Skeleton items come in rectangle, circle, and square shapes.',
        demo: (
          <Skeleton>
            <div className="flex gap-m items-center">
              <SkeletonItem shape="circle" size={48} />
              <div className="flex flex-col gap-xs flex-1">
                <SkeletonItem shape="rectangle" style={{ width: '60%', height: 16 }} />
                <SkeletonItem shape="rectangle" style={{ width: '40%', height: 12 }} />
              </div>
            </div>
          </Skeleton>
        ),
        code: `<Skeleton>
  <div className="flex gap-m items-center">
    <SkeletonItem shape="circle" size={48} />
    <div className="flex flex-col gap-xs flex-1">
      <SkeletonItem shape="rectangle" style={{ width: '60%', height: 16 }} />
      <SkeletonItem shape="rectangle" style={{ width: '40%', height: 12 }} />
    </div>
  </div>
</Skeleton>`,
      },
      {
        title: 'Content Placeholder',
        description: 'A realistic loading skeleton for a card-like layout.',
        demo: (
          <Skeleton>
            <div className="flex flex-col gap-m" style={{ width: 320 }}>
              <SkeletonItem shape="rectangle" style={{ width: '100%', height: 160 }} />
              <SkeletonItem shape="rectangle" style={{ width: '80%', height: 20 }} />
              <SkeletonItem shape="rectangle" style={{ width: '100%', height: 14 }} />
              <SkeletonItem shape="rectangle" style={{ width: '100%', height: 14 }} />
              <SkeletonItem shape="rectangle" style={{ width: '50%', height: 14 }} />
              <div className="flex gap-s">
                <SkeletonItem shape="square" size={32} />
                <SkeletonItem shape="square" size={32} />
              </div>
            </div>
          </Skeleton>
        ),
        code: `<Skeleton>
  <SkeletonItem shape="rectangle" style={{ width: '100%', height: 160 }} />
  <SkeletonItem shape="rectangle" style={{ width: '80%', height: 20 }} />
  <SkeletonItem shape="rectangle" style={{ width: '100%', height: 14 }} />
  <div className="flex gap-s">
    <SkeletonItem shape="square" size={32} />
    <SkeletonItem shape="square" size={32} />
  </div>
</Skeleton>`,
      },
    ],
  },

  Carousel: {
    name: 'Carousel',
    description: 'Carousel displays a series of content items that can be cycled through one at a time.',
    examples: [
      {
        title: 'Basic Carousel',
        description: 'A controlled carousel with colored slides.',
        demo: <CarouselDemo />,
        code: `const [activeIndex, setActiveIndex] = useState(0);

<Carousel activeIndex={activeIndex} onActiveIndexChange={setActiveIndex}>
  <CarouselItem>
    <div className="flex items-center justify-center h-[200px] bg-brand-background-2">
      <Text variant="title2">Slide 1</Text>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div className="flex items-center justify-center h-[200px] bg-palette-green-background-2">
      <Text variant="title2">Slide 2</Text>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div className="flex items-center justify-center h-[200px] bg-palette-red-background-2">
      <Text variant="title2">Slide 3</Text>
    </div>
  </CarouselItem>
</Carousel>`,
      },
      {
        title: 'Autoplay',
        description: 'Carousel can automatically cycle through items.',
        demo: (
          <Carousel autoplay autoplayInterval={3000}>
            <CarouselItem>
              <div className="flex items-center justify-center h-[150px] bg-brand-background-2 text-brand-foreground-2 rounded-medium">
                <Text variant="subtitle1">Auto Slide 1</Text>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center h-[150px] bg-palette-green-background-2 text-palette-green-foreground-2 rounded-medium">
                <Text variant="subtitle1">Auto Slide 2</Text>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center h-[150px] bg-palette-red-background-2 text-palette-red-foreground-2 rounded-medium">
                <Text variant="subtitle1">Auto Slide 3</Text>
              </div>
            </CarouselItem>
          </Carousel>
        ),
        code: `<Carousel autoplay autoplayInterval={3000}>
  <CarouselItem>
    <div>Auto Slide 1</div>
  </CarouselItem>
  <CarouselItem>
    <div>Auto Slide 2</div>
  </CarouselItem>
  <CarouselItem>
    <div>Auto Slide 3</div>
  </CarouselItem>
</Carousel>`,
      },
    ],
  },
};
