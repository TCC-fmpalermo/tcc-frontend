import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { set } from "react-hook-form";
export interface DecodedToken {
  permissions: string[];
  id: number;
  exp: number;
}
interface AuthContextType {
  token: string | null;
  userData: DecodedToken | null;
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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setTokenState(storedToken);
      setUserData(jwtDecode(storedToken));
    } else {
      setTokenState(null);
    }
  }, []);

  const setToken = (token: string) => {
    setTokenState(token);
    setUserData(jwtDecode(token));
    localStorage.setItem("authToken", token);
  };

  const clearToken = () => {
    setTokenState(null);
    setUserData(null);
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
    <AuthContext.Provider value={{ token, userData, setToken, clearToken, isValidToken }}>
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
