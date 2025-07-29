import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<UserRole, User> = {
  sales_executive: {
    id: 'se_001',
    name: 'Priya Sharma',
    email: 'priya.sharma@bank.com',
    role: 'sales_executive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    department: 'Sales',
    reportingTo: 'sup_001',
    territory: 'Mumbai Central',
    phone: '+91 98765 43210',
    employeeId: 'EMP001'
  },
  supervisor: {
    id: 'sup_001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@bank.com',
    role: 'supervisor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
    department: 'Sales',
    territory: 'Mumbai Region',
    phone: '+91 98765 43211',
    employeeId: 'SUP001'
  },
  inbound_agent: {
    id: 'ia_001',
    name: 'Sneha Patel',
    email: 'sneha.patel@bank.com',
    role: 'inbound_agent',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    department: 'Customer Service',
    phone: '+91 98765 43212',
    employeeId: 'INB001'
  },
  relationship_manager: {
    id: 'rm_001',
    name: 'Arjun Singh',
    email: 'arjun.singh@bank.com',
    role: 'relationship_manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    department: 'Wealth Management',
    territory: 'Premium Banking',
    phone: '+91 98765 43213',
    employeeId: 'RM001'
  },
  admin: {
    id: 'adm_001',
    name: 'Meera Gupta',
    email: 'meera.gupta@bank.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
    department: 'Administration',
    phone: '+91 98765 43214',
    employeeId: 'ADM001'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('banking_crm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email from demo users
    const foundUser = Object.values(demoUsers).find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('banking_crm_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('banking_crm_user');
  };

  const switchRole = (role: UserRole) => {
    const newUser = demoUsers[role];
    setUser(newUser);
    localStorage.setItem('banking_crm_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      switchRole,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { demoUsers };