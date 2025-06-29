import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from './auth/AuthForm';
import { HabitDashboard } from './HabitDashboard';

export function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return user ? <HabitDashboard /> : <AuthForm />;
}