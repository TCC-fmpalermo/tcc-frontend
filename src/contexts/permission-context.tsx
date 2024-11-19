import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getPermissions } from '@/data/permissions';

type Permission = string;
type Permissions = Set<Permission>;

type PermissionsContextType = {
  permissions: Permissions | null;
  isLoading: boolean;
};

const PermissionsContext = createContext<PermissionsContextType | null>(null);

interface PermissionsProviderProps {
  children: ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data: Permission[] = await getPermissions();
        setPermissions(new Set(data));
      } catch (error) {
        console.error('Erro ao buscar permissões:', error);
        setPermissions(new Set());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, isLoading }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);

  if (context === null) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }

  return context;
};

export const useHasPermission = (permission: Permission): boolean => {
  const { permissions, isLoading } = usePermissions();

  if (isLoading || !permissions) {
    return false; // Retorna false enquanto carrega as permissões
  }

  return permissions.has(permission);
};
