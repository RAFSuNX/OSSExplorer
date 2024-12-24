import React from 'react';
import { Mail } from 'lucide-react';

export function ContactBanner() {
  return (
    <div className="bg-violet-500/10 border-b border-violet-500/20 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300">
          Want to add your repository? Contact us at{' '}
          <a 
            href="mailto:git@rafsunx.com" 
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            git@rafsunx.com
          </a>
          {' '}or Telegram{' '}
          <a 
            href="https://t.me/rafsunx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            @rafsunx
          </a>
        </p>
      </div>
    </div>
  );
}