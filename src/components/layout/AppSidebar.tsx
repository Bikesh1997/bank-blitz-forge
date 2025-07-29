import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { 
  LayoutDashboard,
  Users,
  UserPlus,
  Phone,
  Calendar,
  Target,
  MapPin,
  Settings,
  Trophy,
  BookOpen,
  BarChart3,
  Shield,
  Building2,
  Briefcase,
  Clock,
  TrendingUp,
  UserCheck,
  FileText,
  Gamepad2,
  Award,
  Navigation
} from 'lucide-react';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: string;
}

const navigationItems: NavItem[] = [
  // Core Dashboard
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    roles: ['sales_executive', 'supervisor', 'inbound_agent', 'relationship_manager', 'admin']
  },

  // Sales Executive Specific
  {
    title: 'My KRAs',
    url: '/kras',
    icon: Target,
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager']
  },
  {
    title: 'Missions',
    url: '/missions',
    icon: Gamepad2,
    roles: ['sales_executive', 'inbound_agent']
  },
  {
    title: 'My Leads',
    url: '/leads',
    icon: UserPlus,
    roles: ['sales_executive', 'inbound_agent']
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: Users,
    roles: ['sales_executive', 'relationship_manager', 'supervisor']
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: Clock,
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager']
  },
  {
    title: 'Route Planning',
    url: '/route-planning',
    icon: Navigation,
    roles: ['sales_executive']
  },

  // Supervisor Specific
  {
    title: 'Team Dashboard',
    url: '/team',
    icon: Users,
    roles: ['supervisor']
  },
  {
    title: 'Live Tracking',
    url: '/tracking',
    icon: MapPin,
    roles: ['supervisor']
  },
  {
    title: 'Portfolio Management',
    url: '/portfolio',
    icon: Briefcase,
    roles: ['supervisor', 'relationship_manager']
  },
  {
    title: 'Territory Management',
    url: '/territory',
    icon: MapPin,
    roles: ['supervisor']
  },
  {
    title: 'Lead Assignment',
    url: '/lead-assignment',
    icon: UserCheck,
    roles: ['supervisor']
  },

  // Admin Specific
  {
    title: 'User Management',
    url: '/users',
    icon: Shield,
    roles: ['admin']
  },
  {
    title: 'Rule Management',
    url: '/rules',
    icon: Settings,
    roles: ['admin', 'supervisor']
  },
  {
    title: 'Event Management',
    url: '/events',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'Reports & Analytics',
    url: '/analytics',
    icon: BarChart3,
    roles: ['supervisor', 'admin', 'relationship_manager']
  },

  // Shared Features
  {
    title: 'Achievements',
    url: '/achievements',
    icon: Award,
    roles: ['sales_executive', 'inbound_agent']
  },
  {
    title: 'Leaderboard',
    url: '/leaderboard',
    icon: Trophy,
    roles: ['sales_executive', 'supervisor', 'inbound_agent']
  },
  {
    title: 'Financial Education',
    url: '/education',
    icon: BookOpen,
    roles: ['sales_executive', 'inbound_agent', 'relationship_manager', 'supervisor']
  },
  {
    title: 'Call Management',
    url: '/calls',
    icon: Phone,
    roles: ['sales_executive', 'inbound_agent']
  }
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  if (!user) return null;

  // Filter navigation items based on user role
  const userNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  // Group items by category
  const coreItems = userNavItems.filter(item => 
    ['Dashboard', 'My KRAs', 'Missions', 'My Leads', 'Customers', 'Tasks'].includes(item.title)
  );

  const managementItems = userNavItems.filter(item => 
    ['Team Dashboard', 'Live Tracking', 'Portfolio Management', 'Territory Management', 'Lead Assignment', 'Route Planning'].includes(item.title)
  );

  const adminItems = userNavItems.filter(item => 
    ['User Management', 'Rule Management', 'Event Management', 'Reports & Analytics'].includes(item.title)
  );

  const gamificationItems = userNavItems.filter(item => 
    ['Achievements', 'Leaderboard'].includes(item.title)
  );

  const toolsItems = userNavItems.filter(item => 
    ['Financial Education', 'Call Management'].includes(item.title)
  );

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-accent text-accent-foreground font-medium' : 'hover:bg-accent/50';

  const renderNavGroup = (title: string, items: NavItem[]) => {
    if (items.length === 0) return null;

    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url} end className={getNavCls}>
                    <item.icon className="h-4 w-4" />
                    {!collapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent className="py-4">
        {/* Header with Logo */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg">Banking CRM</h1>
                <p className="text-xs text-muted-foreground">
                  {user.role.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Groups */}
        {renderNavGroup('Core', coreItems)}
        {renderNavGroup('Management', managementItems)}
        {renderNavGroup('Administration', adminItems)}
        {renderNavGroup('Gamification', gamificationItems)}
        {renderNavGroup('Tools', toolsItems)}
      </SidebarContent>
    </Sidebar>
  );
}