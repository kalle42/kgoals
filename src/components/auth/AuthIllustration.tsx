import React from 'react';

export function AuthIllustration() {
  return (
    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-64 h-64 text-gray-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
          <circle cx="12" cy="12" r="4" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
    </div>
  );
}