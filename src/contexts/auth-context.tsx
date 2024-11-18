import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>("loading");

  // Carregar o token do localStorage quando o componente for montado
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

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
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
