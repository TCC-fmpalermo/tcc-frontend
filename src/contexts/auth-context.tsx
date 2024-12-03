import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export interface DecodedToken {
  permissions?: string[];
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  exp?: number;
}
interface AuthContextType {
  token: string | null;
  userData: DecodedToken;
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
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setTokenState(storedToken);
      const decoded: DecodedToken = jwtDecode(storedToken);
      
      setUserData({
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      });
    } else {
      setTokenState(null);
    }
  }, []);

  const setToken = (token: string) => {
    setTokenState(token);
    const decoded: DecodedToken = jwtDecode(token);
      
      setUserData({
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      });
    localStorage.setItem("authToken", token);
  };

  const clearToken = () => {
    setTokenState(null);
    setUserData({});
    localStorage.removeItem("authToken");
  };

  const isValidToken = (): boolean => {
    if (!token) return false;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp === undefined) return false;
      
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
