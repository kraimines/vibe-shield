import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole, User } from '@/types';

interface RoleContextType {
  user: User | null;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | null>(null);

const usersByRole: Record<UserRole, User> = {
  employee: { id: '1', name: 'Ahmed Ben Salah', email: 'ahmed.bensalah@talan.com', role: 'employee', department: 'Engineering' },
  manager: { id: '2', name: 'Fatma Khelifi', email: 'fatma.khelifi@talan.com', role: 'manager', department: 'Engineering' },
  direction: { id: '3', name: 'Karim Jebali', email: 'karim.jebali@talan.com', role: 'direction', department: 'Direction Générale' },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setRole = (role: UserRole) => setUser(usersByRole[role]);
  const logout = () => setUser(null);

  return (
    <RoleContext.Provider value={{ user, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
