import { KRA, Lead, Customer, Task, Mission, Achievement, DashboardStats, Notification } from '@/types';

export const mockKRAs: KRA[] = [
  {
    id: 'kra_001',
    title: 'Monthly Loan Targets',
    description: 'Achieve monthly personal loan disbursement target',
    target: 50,
    achieved: 32,
    unit: 'loans',
    category: 'sales',
    deadline: '2024-08-31',
    xpReward: 500,
    priority: 'high'
  },
  {
    id: 'kra_002',
    title: 'Lead Generation',
    description: 'Generate quality leads through various channels',
    target: 100,
    achieved: 78,
    unit: 'leads',
    category: 'leads',
    deadline: '2024-08-31',
    xpReward: 300,
    priority: 'medium'
  },
  {
    id: 'kra_003',
    title: 'Customer Calls',
    description: 'Daily customer outreach calls',
    target: 200,
    achieved: 145,
    unit: 'calls',
    category: 'calls',
    deadline: '2024-08-31',
    xpReward: 200,
    priority: 'medium'
  },
  {
    id: 'kra_004',
    title: 'Revenue Target',
    description: 'Monthly revenue generation from all products',
    target: 2500000,
    achieved: 1850000,
    unit: '₹',
    category: 'revenue',
    deadline: '2024-08-31',
    xpReward: 1000,
    priority: 'urgent'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead_001',
    name: 'Amit Verma',
    email: 'amit.verma@gmail.com',
    phone: '+91 98765 12345',
    status: 'new',
    source: 'Website',
    assignedTo: 'se_001',
    createdAt: '2024-07-28',
    lastContact: '2024-07-28',
    nextFollowUp: '2024-07-30',
    leadScore: 85,
    estimatedValue: 500000,
    products: ['Personal Loan', 'Credit Card'],
    notes: 'Interested in home loan for property purchase',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Andheri West, Mumbai'
    }
  },
  {
    id: 'lead_002',
    name: 'Sunita Rao',
    email: 'sunita.rao@gmail.com',
    phone: '+91 98765 12346',
    status: 'contacted',
    source: 'Referral',
    assignedTo: 'se_001',
    createdAt: '2024-07-25',
    lastContact: '2024-07-29',
    nextFollowUp: '2024-08-02',
    leadScore: 72,
    estimatedValue: 1200000,
    products: ['Home Loan', 'Life Insurance'],
    notes: 'Looking for investment options and home loan',
    location: {
      lat: 19.1136,
      lng: 72.8697,
      address: 'Juhu, Mumbai'
    }
  },
  {
    id: 'lead_003',
    name: 'Vikash Singh',
    email: 'vikash.singh@gmail.com',
    phone: '+91 98765 12347',
    status: 'qualified',
    source: 'Cold Call',
    assignedTo: 'se_001',
    createdAt: '2024-07-20',
    lastContact: '2024-07-29',
    nextFollowUp: '2024-08-01',
    leadScore: 90,
    estimatedValue: 800000,
    products: ['Business Loan', 'Current Account'],
    notes: 'Small business owner, needs working capital',
    location: {
      lat: 19.0825,
      lng: 72.8231,
      address: 'Bandra West, Mumbai'
    }
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task_001',
    title: 'Follow up with Amit Verma',
    description: 'Discuss home loan options and documentation requirements',
    assignedTo: 'se_001',
    assignedBy: 'sup_001',
    dueDate: '2024-07-30',
    priority: 'high',
    status: 'pending',
    category: 'call',
    relatedEntity: {
      type: 'lead',
      id: 'lead_001',
      name: 'Amit Verma'
    },
    xpReward: 50
  },
  {
    id: 'task_002',
    title: 'Customer visit - Sunita Rao',
    description: 'Home visit for loan documentation and verification',
    assignedTo: 'se_001',
    assignedBy: 'sup_001',
    dueDate: '2024-08-02',
    priority: 'medium',
    status: 'pending',
    category: 'visit',
    relatedEntity: {
      type: 'lead',
      id: 'lead_002',
      name: 'Sunita Rao'
    },
    xpReward: 100
  },
  {
    id: 'task_003',
    title: 'Prepare loan proposal',
    description: 'Create detailed business loan proposal for Vikash Singh',
    assignedTo: 'se_001',
    assignedBy: 'sup_001',
    dueDate: '2024-08-01',
    priority: 'high',
    status: 'in_progress',
    category: 'documentation',
    relatedEntity: {
      type: 'lead',
      id: 'lead_003',
      name: 'Vikash Singh'
    },
    xpReward: 75,
    timeTracking: {
      startTime: '2024-07-29T10:00:00Z'
    }
  }
];

export const mockMissions: Mission[] = [
  {
    id: 'mission_001',
    title: 'Daily Call Champion',
    description: 'Complete 15 customer calls today',
    type: 'daily',
    xpReward: 100,
    deadline: '2024-07-29T23:59:59Z',
    requirements: {
      type: 'calls',
      target: 15,
      current: 8
    },
    status: 'active',
    difficulty: 'medium'
  },
  {
    id: 'mission_002',
    title: 'Lead Generation Master',
    description: 'Generate 5 qualified leads this week',
    type: 'weekly',
    xpReward: 300,
    deadline: '2024-08-04T23:59:59Z',
    requirements: {
      type: 'leads',
      target: 5,
      current: 2
    },
    status: 'active',
    difficulty: 'hard'
  },
  {
    id: 'mission_003',
    title: 'Meeting Marathon',
    description: 'Attend 3 customer meetings today',
    type: 'daily',
    xpReward: 150,
    deadline: '2024-07-29T23:59:59Z',
    requirements: {
      type: 'meetings',
      target: 3,
      current: 1
    },
    status: 'active',
    difficulty: 'medium'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach_001',
    title: 'First Call',
    description: 'Complete your first customer call',
    icon: '📞',
    category: 'calls',
    tier: 'bronze',
    xpValue: 50,
    unlockedAt: '2024-07-15T10:30:00Z',
    requirements: {
      type: 'calls',
      target: 1
    }
  },
  {
    id: 'ach_002',
    title: 'Lead Converter',
    description: 'Convert 10 leads to customers',
    icon: '🎯',
    category: 'leads',
    tier: 'silver',
    xpValue: 200,
    requirements: {
      type: 'conversions',
      target: 10
    }
  },
  {
    id: 'ach_003',
    title: 'Sales Warrior',
    description: 'Achieve monthly sales target',
    icon: '⚔️',
    category: 'sales',
    tier: 'gold',
    xpValue: 500,
    unlockedAt: '2024-07-01T00:00:00Z',
    requirements: {
      type: 'sales_target',
      target: 1
    }
  },
  {
    id: 'ach_004',
    title: 'Consistency King',
    description: 'Complete daily tasks for 30 consecutive days',
    icon: '👑',
    category: 'consistency',
    tier: 'platinum',
    xpValue: 1000,
    requirements: {
      type: 'consecutive_days',
      target: 30
    }
  }
];

export const mockDashboardStats: DashboardStats = {
  totalLeads: 156,
  convertedLeads: 89,
  totalCalls: 245,
  totalMeetings: 67,
  revenue: 1850000,
  xp: 2450,
  level: 12,
  rank: 3,
  completedTasks: 23,
  pendingTasks: 7
};

export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    title: 'New Lead Assigned',
    message: 'You have been assigned a new lead: Rohit Sharma',
    type: 'info',
    userId: 'se_001',
    read: false,
    createdAt: '2024-07-29T14:30:00Z',
    actionUrl: '/leads/lead_004',
    category: 'lead'
  },
  {
    id: 'notif_002',
    title: 'Mission Completed!',
    message: 'Congratulations! You completed the "Daily Call Champion" mission and earned 100 XP',
    type: 'success',
    userId: 'se_001',
    read: false,
    createdAt: '2024-07-29T12:15:00Z',
    category: 'mission'
  },
  {
    id: 'notif_003',
    title: 'Task Deadline Approaching',
    message: 'Your task "Follow up with Amit Verma" is due in 2 hours',
    type: 'warning',
    userId: 'se_001',
    read: true,
    createdAt: '2024-07-29T11:00:00Z',
    actionUrl: '/tasks/task_001',
    category: 'task'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust_001',
    name: 'Rajesh Agarwal',
    email: 'rajesh.agarwal@gmail.com',
    phone: '+91 98765 54321',
    pan: 'ABCDE1234F',
    aadhaar: '1234 5678 9012',
    address: '123 MG Road, Sector 15',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    dateOfBirth: '1985-03-15',
    occupation: 'Software Engineer',
    annualIncome: 1200000,
    relationshipManager: 'rm_001',
    customerSince: '2020-05-10',
    kycStatus: 'verified',
    cibil: 780,
    totalRelationshipValue: 2500000,
    products: [
      {
        id: 'prod_001',
        type: 'savings',
        name: 'Premium Savings Account',
        accountNumber: 'SB123456789',
        balance: 450000,
        interestRate: 3.5,
        status: 'active',
        createdAt: '2020-05-10'
      },
      {
        id: 'prod_002',
        type: 'loan',
        name: 'Home Loan',
        accountNumber: 'HL987654321',
        balance: 1800000,
        interestRate: 8.5,
        emi: 18500,
        maturityDate: '2040-05-10',
        status: 'active',
        createdAt: '2021-02-15'
      }
    ],
    familyMembers: [
      {
        id: 'fam_001',
        name: 'Priya Agarwal',
        relation: 'Spouse',
        phone: '+91 98765 54322',
        email: 'priya.agarwal@gmail.com',
        occupation: 'Teacher'
      },
      {
        id: 'fam_002',
        name: 'Aarav Agarwal',
        relation: 'Son',
        phone: '',
        email: '',
        occupation: 'Student'
      }
    ]
  }
];