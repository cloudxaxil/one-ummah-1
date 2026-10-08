import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState, UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demonstration
const MOCK_USERS: Record<string, User> = {
  'teacher@oneummah.org': {
    id: 'usr_teacher_001',
    email: 'teacher@oneummah.org',
    displayName: 'Sheikh Ahmad Al-Rashidi',
    role: 'teacher',
    bio: 'Scholar of Quranic Sciences with 15 years of teaching experience.',
    languages: ['Arabic', 'English', 'Urdu'],
    createdAt: '2024-01-15T10:00:00Z',
  },
  'student@oneummah.org': {
    id: 'usr_student_001',
    email: 'student@oneummah.org',
    displayName: 'Fatima Hassan',
    role: 'student',
    bio: 'Seeking knowledge in Quran memorization and Fiqh.',
    languages: ['English', 'Arabic'],
    createdAt: '2024-03-20T14:30:00Z',
  },
  'researcher@oneummah.org': {
    id: 'usr_researcher_001',
    email: 'researcher@oneummah.org',
    displayName: 'Dr. Yusuf Ibrahim',
    role: 'researcher',
    bio: 'Researcher in Islamic Jurisprudence and Contemporary Issues.',
    languages: ['Arabic', 'English', 'French'],
    createdAt: '2024-02-10T09:00:00Z',
  },
};

// Pre-configured admin credentials (cannot be registered, only assigned)
const ADMIN_CREDENTIALS = {
  id: 'usr_admin_001',
  email: 'admin@oneummah.org',
  password: 'Admin@2024!Secure',
  displayName: 'Admin Team',
  role: 'admin' as const,
  bio: 'Platform administrator.',
  languages: ['English'],
  createdAt: '2024-01-01T00:00:00Z',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check for pre-configured admin credentials
    if (email === ADMIN_CREDENTIALS.email) {
      if (password !== ADMIN_CREDENTIALS.password) {
        setState(prev => ({ ...prev, isLoading: false }));
        throw new Error('Invalid admin credentials');
      }
      const { password: _, ...adminUser } = ADMIN_CREDENTIALS;
      setState({ user: adminUser, isAuthenticated: true, isLoading: false });
      return;
    }
    
    // Regular user login
    const user = MOCK_USERS[email] || {
      id: `usr_${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role,
      languages: ['English'],
      createdAt: new Date().toISOString(),
    };

    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const register = useCallback(async (email: string, _password: string, displayName: string, role: UserRole) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Prevent admin registration
    if (role === 'admin') {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Admin accounts cannot be self-registered');
    }
    
    const user: User = {
      id: `usr_${Date.now()}`,
      email,
      displayName,
      role,
      languages: ['English'],
      createdAt: new Date().toISOString(),
    };

    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
