import React from 'react';

export function Logo() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-serif tracking-wider">KARL'S</h1>
      <div className="bg-black text-white px-6 py-1 text-sm tracking-widest">
        GOALS
      </div>
      <div className="mt-3 text-xl font-bold text-gray-700">
        keeping joe's goals alive
      </div>
    </div>
  );
}