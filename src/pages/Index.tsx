import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SalesExecutiveDashboard } from '@/components/dashboard/SalesExecutiveDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';
import { 
  BarChart3, 
  Users, 
  Shield, 
  Phone, 
  Briefcase,
  Construction
} from 'lucide-react';

const ComingSoonDashboard: React.FC<{ role: UserRole; title: string; description: string; icon: React.ReactNode }> = ({ 
  role, 
  title, 
  description, 
  icon 
}) => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <Badge variant="outline" className="text-sm">
          Role: {role.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
    </div>

    <Card className="banking-card max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-4">
          <Construction className="h-6 w-6 text-warning" />
        </div>
        <CardTitle>Dashboard Coming Soon</CardTitle>
        <CardDescription>
          This dashboard is currently under development and will be available soon with comprehensive features tailored for your role.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          In the meantime, you can switch to the Sales Executive role to explore the fully functional dashboard.
        </p>
      </CardContent>
    </Card>
  </div>
);

const Index = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Role-based dashboard rendering
  switch (user.role) {
    case 'sales_executive':
      return <SalesExecutiveDashboard />;
    
    case 'supervisor':
      return (
        <ComingSoonDashboard
          role={user.role}
          title="Supervisor Dashboard"
          description="Monitor your team's performance, track territories, and manage lead assignments with comprehensive analytics and real-time insights."
          icon={<Users className="h-8 w-8 text-primary" />}
        />
      );
    
    case 'inbound_agent':
      return (
        <ComingSoonDashboard
          role={user.role}
          title="Inbound Agent Dashboard"
          description="Handle incoming customer inquiries, manage call queues, and track your daily performance with gamified metrics."
          icon={<Phone className="h-8 w-8 text-primary" />}
        />
      );
    
    case 'relationship_manager':
      return (
        <ComingSoonDashboard
          role={user.role}
          title="Relationship Manager Dashboard"
          description="Manage high-value client portfolios, track investment opportunities, and maintain premium customer relationships."
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
      );
    
    case 'admin':
      return (
        <ComingSoonDashboard
          role={user.role}
          title="Admin Dashboard"
          description="Configure system-wide settings, manage users and permissions, and oversee organizational rules and compliance."
          icon={<Shield className="h-8 w-8 text-primary" />}
        />
      );
    
    default:
      return (
        <ComingSoonDashboard
          role={user.role}
          title="Welcome to Banking CRM"
          description="Your personalized dashboard is being prepared based on your role and permissions."
          icon={<BarChart3 className="h-8 w-8 text-primary" />}
        />
      );
  }
};

export default Index;
