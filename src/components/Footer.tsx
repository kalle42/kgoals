import React from 'react';
import { Link } from './Link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Karl's Goals. All rights reserved.
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="https://karls-tools.one" className="text-sm text-gray-600 hover:text-gray-900">
              Karl's Tools
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}