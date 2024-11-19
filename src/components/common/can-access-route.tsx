import { usePermissions } from '@/contexts/permission-context';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../ui/loading-spinner';

interface CanAccessRouteProps {
  children: React.ReactNode;
  permission?: string;
}

export const CanAccessRoute: React.FC<CanAccessRouteProps> = ({ children, permission }) => {
  const { permissions, isLoading } = usePermissions();

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={40}/>
        </div>
    );
  }

  if (permission && (!permissions || !permissions.has(permission))) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};
