import React from 'react';
import { Mail, ExternalLink, MessageCircle, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-violet-500/20 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@rafsunx.com"
              className="text-gray-400 hover:text-violet-400 flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contact@rafsunx.com</span>
            </a>
            <a
              href="https://t.me/rafsunx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-violet-400 flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>@rafsunx</span>
            </a>
          </div>
          <a
            href="https://rafsunx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-violet-400 flex items-center gap-2 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>rafsunx.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}