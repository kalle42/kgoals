import React from 'react';
import { Logo } from '../Logo';
import { AppPreview } from './AppPreview';
import { AuthTabs } from './AuthTabs';
import { Footer } from '../Footer';

export function AuthForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Logo />
          </div>

          <div className="space-y-12">
            <AppPreview />
            <AuthTabs />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}