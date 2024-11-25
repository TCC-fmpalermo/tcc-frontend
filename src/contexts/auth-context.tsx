import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
export interface DecodedToken {
  permissions: string[];
  exp: number;
}
interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  isValidToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>("loading");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setTokenState(storedToken);
    } else {
      setTokenState(null);
    }
  }, []);

  const setToken = (token: string) => {
    setTokenState(token);
    localStorage.setItem("authToken", token);
  };

  const clearToken = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
  };

  const isValidToken = (): boolean => {
    if (!token) return false;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      
      const now = Math.floor(Date.now() / 1000);
      
      return decoded.exp > now;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, isValidToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
