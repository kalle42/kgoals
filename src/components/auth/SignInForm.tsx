import React, { useState } from 'react';
import { signIn, resetPassword } from '../../lib/auth';
import { Loader2 } from 'lucide-react';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await signIn(email, password);
      
      // Push login event to dataLayer
      if (user) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'login',
          'authentication_method': 'email',
          'user_id': user.id
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await resetPassword(email);
      setMessage('Check your email for the password reset link');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (isResetMode) {
    return (
      <form onSubmit={handlePasswordReset} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            We'll send you an email with a link to reset your password
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <button
            onClick={() => setIsResetMode(false)}
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {message && (
        <div className="p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <div>
        <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div>
        <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <button
          onClick={() => setIsResetMode(true)}
          type="button"
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}