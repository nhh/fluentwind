import { useState } from 'react';
import {
  FluentWindProvider,
  useTheme,
  Nav,
  NavItem,
  Breadcrumb,
  BreadcrumbItem,
  Avatar,
  Badge,
  Text,
  Divider,
  Button,
  Persona,
} from '@fluentwind/react';
import type { Theme } from '@fluentwind/tokens';
import {
  LayoutDashboard,
  BarChart3,
  Users as UsersIcon,
  Activity as ActivityIcon,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Activity from './pages/Activity';
import Settings from './pages/Settings';

type Page = 'dashboard' | 'users' | 'analytics' | 'activity' | 'settings';

const pageLabels: Record<Page, string> = {
  dashboard: 'Dashboard',
  users: 'Users',
  analytics: 'Analytics',
  activity: 'Activity Log',
  settings: 'Settings',
};

const navSections = [
  {
    label: 'Overview',
    items: [
      { value: 'dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
      { value: 'analytics' as Page, label: 'Analytics', icon: <BarChart3 size={18} /> },
    ],
  },
  {
    label: 'Management',
    items: [
      { value: 'users' as Page, label: 'Users', icon: <UsersIcon size={18} /> },
      { value: 'activity' as Page, label: 'Activity Log', icon: <ActivityIcon size={18} /> },
    ],
  },
  {
    label: 'System',
    items: [{ value: 'settings' as Page, label: 'Settings', icon: <SettingsIcon size={18} /> }],
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme.endsWith('-dark') || theme === 'high-contrast';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'web-light' : 'web-dark')}
      className="p-xs rounded-medium hover:bg-subtle-background-hover transition-colors cursor-pointer text-neutral-foreground-2"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 bg-neutral-background-1 border-r border-neutral-stroke-2 flex flex-col transition-all duration-normal z-10 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-s p-m border-b border-neutral-stroke-2">
        <div className="w-8 h-8 rounded-medium bg-brand-background flex items-center justify-center text-white font-bold text-300 shrink-0">
          A
        </div>
        {!collapsed && (
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 truncate">
            Admin Panel
          </Text>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-xs rounded-medium hover:bg-subtle-background-hover transition-colors cursor-pointer text-neutral-foreground-3"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-xs">
        {navSections.map((section) => (
          <div key={section.label} className="mb-s">
            {!collapsed && (
              <div className="px-m pt-m pb-xs text-100 leading-100 font-semibold text-neutral-foreground-3 uppercase tracking-wider">
                {section.label}
              </div>
            )}
            <Nav size="medium">
              {section.items.map((item) => (
                <NavItem
                  key={item.value}
                  value={item.value}
                  selected={currentPage === item.value}
                  onClick={() => onNavigate(item.value)}
                  icon={item.icon}
                >
                  {!collapsed && item.label}
                </NavItem>
              ))}
            </Nav>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-m border-t border-neutral-stroke-2">
          <Persona
            name="Sarah Chen"
            secondaryText="Admin"
            avatar={<Avatar name="Sarah Chen" size={32} color="brand" />}
            size="small"
          />
        </div>
      )}
    </aside>
  );
}

function Header({ currentPage }: { currentPage: Page }) {
  return (
    <header className="flex items-center justify-between mb-l">
      <div>
        <Breadcrumb>
          <BreadcrumbItem>Admin</BreadcrumbItem>
          <BreadcrumbItem current>{pageLabels[currentPage]}</BreadcrumbItem>
        </Breadcrumb>
        <Text className="text-600 leading-600 font-semibold text-neutral-foreground-1 block mt-xs">
          {pageLabels[currentPage]}
        </Text>
      </div>
      <div className="flex items-center gap-s">
        <ThemeToggle />
        <div className="relative">
          <button
            type="button"
            className="p-xs rounded-medium hover:bg-subtle-background-hover transition-colors cursor-pointer text-neutral-foreground-2"
          >
            <Bell size={18} />
          </button>
          <Badge
            color="danger"
            size="tiny"
            className="absolute -top-0.5 -right-0.5"
          >
            3
          </Badge>
        </div>
        <Avatar name="Sarah Chen" size={32} color="brand" />
      </div>
    </header>
  );
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'dashboard':
      return <Dashboard />;
    case 'users':
      return <Users />;
    case 'analytics':
      return <Analytics />;
    case 'activity':
      return <Activity />;
    case 'settings':
      return <Settings />;
  }
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('web-light');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <FluentWindProvider theme={theme} onThemeChange={setTheme}>
      <div className="min-h-screen bg-neutral-background-2 transition-colors duration-normal">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
        <main
          className={`transition-all duration-normal p-xl ${
            sidebarCollapsed ? 'ml-16' : 'ml-60'
          }`}
        >
          <Header currentPage={currentPage} />
          <PageContent page={currentPage} />
        </main>
      </div>
    </FluentWindProvider>
  );
}
