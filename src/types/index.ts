// Banking CRM Types

export type UserRole = 'sales_executive' | 'supervisor' | 'inbound_agent' | 'relationship_manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  reportingTo?: string;
  territory?: string;
  phone: string;
  employeeId: string;
}

export interface KRA {
  id: string;
  title: string;
  description: string;
  target: number;
  achieved: number;
  unit: string;
  category: 'sales' | 'leads' | 'calls' | 'meetings' | 'revenue';
  deadline: string;
  xpReward: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  source: string;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp: string;
  leadScore: number;
  estimatedValue: number;
  products: string[];
  notes: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  dateOfBirth: string;
  occupation: string;
  annualIncome: number;
  relationshipManager: string;
  customerSince: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  cibil: number;
  products: Product[];
  familyMembers: FamilyMember[];
  totalRelationshipValue: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  customerId?: string;
  phone?: string;
  email?: string;
  occupation?: string;
  products?: Product[];
}

export interface Product {
  id: string;
  type: 'savings' | 'current' | 'loan' | 'credit_card' | 'fd' | 'mutual_fund' | 'insurance';
  name: string;
  accountNumber?: string;
  balance?: number;
  interestRate?: number;
  maturityDate?: string;
  emi?: number;
  status: 'active' | 'closed' | 'dormant';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  category: 'call' | 'meeting' | 'follow_up' | 'documentation' | 'visit';
  relatedEntity?: {
    type: 'lead' | 'customer';
    id: string;
    name: string;
  };
  xpReward: number;
  timeTracking?: {
    startTime: string;
    endTime?: string;
    duration?: number;
  };
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  xpReward: number;
  deadline: string;
  requirements: {
    type: 'calls' | 'meetings' | 'leads' | 'sales' | 'visits';
    target: number;
    current: number;
  };
  status: 'active' | 'completed' | 'expired';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sales' | 'calls' | 'leads' | 'consistency' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpValue: number;
  unlockedAt?: string;
  requirements: {
    type: string;
    target: number;
  };
}

export interface Team {
  id: string;
  name: string;
  supervisorId: string;
  members: User[];
  territory: string;
  targets: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  performance: {
    achievement: number;
    ranking: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  userId: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  category: 'task' | 'lead' | 'mission' | 'system' | 'achievement';
}

export interface GeofenceAlert {
  id: string;
  userId: string;
  type: 'entry' | 'exit' | 'loitering';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  duration?: number;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  type: 'cross_sell' | 'lead_assignment' | 'escalation' | 'compliance';
  conditions: any[];
  actions: any[];
  active: boolean;
  createdBy: string;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  convertedLeads: number;
  totalCalls: number;
  totalMeetings: number;
  revenue: number;
  xp: number;
  level: number;
  rank: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface LocationData {
  userId: string;
  lat: number;
  lng: number;
  timestamp: string;
  address: string;
  accuracy: number;
  activity: 'stationary' | 'walking' | 'driving' | 'meeting';
}