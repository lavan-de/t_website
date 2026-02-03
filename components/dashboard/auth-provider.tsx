"use client";

import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType>({ userEmail: null });

/**
 * Provider component that makes user info available to all dashboard components.
 * 
 * Usage:
 * - Wrap dashboard layout with this provider (passing user from server)
 * - Access user in any child component with useAuth()
 */
export function AuthProvider({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail: string | null;
}) {
  return (
    <AuthContext.Provider value={{ userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the current user's email in any dashboard component.
 * 
 * Usage:
 *   const { userEmail } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
