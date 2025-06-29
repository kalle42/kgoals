import React from 'react';
import { HabitTable } from './HabitTable';
import { signOut } from '../lib/auth';
import { Logo } from './Logo';
import { Footer } from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { Link } from './Link';

export function HabitDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              {user?.email === 'karl@serpwin.com' && (
                <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-800">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
          <HabitTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}