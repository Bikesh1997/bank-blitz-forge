import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications } from '@/data/mockData';
import { UserRole } from '@/types';
import { 
  Bell, 
  Search, 
  LogOut, 
  User, 
  Settings, 
  HelpCircle,
  Star,
  Trophy,
  Zap
} from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'sales_executive': return 'bg-primary text-primary-foreground';
      case 'supervisor': return 'bg-accent text-accent-foreground';
      case 'inbound_agent': return 'bg-secondary text-secondary-foreground';
      case 'relationship_manager': return 'bg-banking-premium text-white';
      case 'admin': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getXPInfo = () => {
    // Mock XP data based on role
    const xpData = {
      current: 2450,
      level: 12,
      nextLevel: 2500,
      rank: 3
    };
    return xpData;
  };

  const xpInfo = getXPInfo();

  if (!user) return null;

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers, leads, tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80 focus:w-96 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* XP and Level Display */}
          {(user.role === 'sales_executive' || user.role === 'inbound_agent') && (
            <div className="hidden sm:flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{xpInfo.current} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-banking-gold" />
                <span className="text-sm font-medium">Level {xpInfo.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-banking-premium" />
                <span className="text-sm font-medium">Rank #{xpInfo.rank}</span>
              </div>
            </div>
          )}

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadNotifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {unreadNotifications.length} unread notifications
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-accent/50 transition-colors ${
                      !notification.read ? 'bg-accent/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        !notification.read ? 'bg-primary' : 'bg-muted'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-2 gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge 
                    className={`${getRoleColor(user.role)} text-xs`}
                    variant="secondary"
                  >
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="space-y-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">ID: {user.employeeId}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Switch Role (Demo)</DropdownMenuLabel>
              {(['sales_executive', 'supervisor', 'inbound_agent', 'relationship_manager', 'admin'] as UserRole[]).map((role) => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => switchRole(role)}
                  className="cursor-pointer"
                  disabled={user.role === role}
                >
                  <Badge 
                    className={`${getRoleColor(role)} mr-2 text-xs`}
                    variant="secondary"
                  >
                    {role.substring(0, 2).toUpperCase()}
                  </Badge>
                  {role.replace('_', ' ')}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};