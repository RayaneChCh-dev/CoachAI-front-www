import React, { createContext, useContext, useState } from 'react';
import { User }  from '../types';
import { endpoints } from '../config/api';

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(endpoints.auth.login, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem('authToken', token);
      setAuthToken(token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('Sending registration request to:', endpoints.auth.register);
      
      const response = await fetch(endpoints.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
  
      const data = await response.json();
      console.log('Response received:', data);
  
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setUser(data.user);
      setAuthToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(endpoints.auth.logout, { 
        method: 'POST' 

      });
      setUser(null);
      setAuthToken(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};