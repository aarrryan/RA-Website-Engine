import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, getStudentByPRN } from '../data/students';
import { isValidPassword } from '../data/passwords';

interface AuthContextType {
  student: Student | null;
  login: (prn: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPrn = localStorage.getItem('ra_hub_prn');
    if (savedPrn) {
      const savedStudent = getStudentByPRN(savedPrn);
      if (savedStudent) {
        setStudent(savedStudent);
      } else {
        localStorage.removeItem('ra_hub_prn');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (prn: string, password: string) => {
    const isPassValid = isValidPassword(password);
    const foundStudent = getStudentByPRN(prn);

    if (!foundStudent && !isPassValid) {
      return { success: false, error: 'Invalid PRN or access key.' };
    }
    if (!foundStudent) {
      return { success: false, error: 'Invalid PRN.' };
    }
    if (!isPassValid) {
      return { success: false, error: 'Invalid access key.' };
    }

    setStudent(foundStudent);
    localStorage.setItem('ra_hub_prn', foundStudent.prn);
    return { success: true };
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('ra_hub_prn');
  };

  return (
    <AuthContext.Provider value={{ student, login, logout, isAuthenticated: !!student, isLoading }}>
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
