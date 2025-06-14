
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/xanoApi';

interface User {
  id: string;
  email: string;
  name: string;
  linkedin_connected: boolean;
}

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      // Verify token and get user data
      authAPI.getCurrentUser(storedToken).then(({ data, error }) => {
        if (data && !error) {
          setUser(data);
        } else {
          localStorage.removeItem('authToken');
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { data, error } = await authAPI.login(email, password);
    
    if (data && !error) {
      setAuthToken(data.authToken);
      setUser(data.user);
      localStorage.setItem('authToken', data.authToken);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    const { data, error } = await authAPI.register(email, password, name);
    
    if (data && !error) {
      setAuthToken(data.authToken);
      setUser(data.user);
      localStorage.setItem('authToken', data.authToken);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      authToken,
      login,
      register,
      logout,
      isLoading
    }}>
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
