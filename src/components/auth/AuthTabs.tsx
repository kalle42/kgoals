import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { RegisterForm } from './RegisterForm';
import { AuthIllustration } from './AuthIllustration';

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <AuthIllustration />
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('signin')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'signin'
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'register'
              ? 'text-black border-b-2 border-black'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Register
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'signin' ? <SignInForm /> : <RegisterForm />}
      </div>
    </div>
  );
}