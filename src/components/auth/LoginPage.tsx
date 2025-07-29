import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth, demoUsers } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Building2, Mail, Lock, Users, Shield, Phone, User } from 'lucide-react';
import bankingHero from '@/assets/banking-hero.jpg';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Use any demo email with password: demo123');
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const user = demoUsers[role];
    setEmail(user.email);
    setPassword('demo123');
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'sales_executive': return <User className="h-4 w-4" />;
      case 'supervisor': return <Users className="h-4 w-4" />;
      case 'inbound_agent': return <Phone className="h-4 w-4" />;
      case 'relationship_manager': return <Shield className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'sales_executive': return 'bg-primary text-primary-foreground';
      case 'supervisor': return 'bg-accent text-accent-foreground';
      case 'inbound_agent': return 'bg-secondary text-secondary-foreground';
      case 'relationship_manager': return 'bg-banking-premium text-white';
      case 'admin': return 'bg-destructive text-destructive-foreground';
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src={bankingHero} 
          alt="Banking CRM Platform" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 text-center text-white p-8 max-w-lg">
          <div className="mb-6">
            <Building2 className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Banking CRM</h1>
            <p className="text-xl opacity-90">
              Comprehensive Financial Services Platform
            </p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Role-based dashboards with gamification</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Real-time team tracking and analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Comprehensive customer management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Smart lead assignment and conversion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="w-full max-w-md">
        <div className="text-center mb-8 lg:hidden">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Banking CRM
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive Banking & Financial Services CRM
          </p>
        </div>

        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the CRM dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Demo Accounts (Password: demo123)
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(demoUsers).map(([role, user]) => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(role as UserRole)}
                    className="justify-start h-auto p-3 hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Badge className={`${getRoleColor(role as UserRole)} text-xs`}>
                        {getRoleIcon(role as UserRole)}
                      </Badge>
                      <div className="text-left">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {role.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Secure Banking CRM Platform with Role-Based Access Control
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};