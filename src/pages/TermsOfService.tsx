import React from 'react';
import { Link } from '../components/Link';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-block mb-8 text-gray-600 hover:text-gray-900">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Terms</h2>
            <p>By accessing Karl's Goals, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily access Karl's Goals for personal, non-commercial transitory viewing only.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p>The materials on Karl's Goals are provided on an 'as is' basis. Karl's Goals makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p>In no event shall Karl's Goals or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Karl's Goals.</p>
          </section>
        </div>
      </div>
    </div>
  );
}