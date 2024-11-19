import { useAuth } from "@/contexts/auth-context"
import React from "react"
import { Navigate } from "react-router-dom"
import { LoadingSpinner } from "../ui/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, isValidToken } = useAuth()
  
  if (token === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={40}/>
      </div>
    )
  }

  if (!token || !isValidToken()) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>
}
