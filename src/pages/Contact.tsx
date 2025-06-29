import React from 'react';
import { Link } from '../components/Link';

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-block mb-8 text-gray-600 hover:text-gray-900">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg mb-6">
            Have questions or concerns? Please don't hesitate to reach out to us.
          </p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p>support@karlsgoals.com</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Response Time</h2>
              <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
              <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}