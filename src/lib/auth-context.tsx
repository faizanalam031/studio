'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'user' | 'staff' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedRole = localStorage.getItem('userRole') as UserRole;
    setIsLoggedIn(loggedIn);
    setRole(storedRole);
  }, []);

  const login = (email: string, password: string): boolean => {
    let userRole: UserRole = null;

    if (email === 'faizan@gmail.com' && password === '1111') {
      userRole = 'user';
    } else if (email === 'store@gmail.com' && password === '1111') {
      userRole = 'staff';
    }

    if (userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', userRole);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}