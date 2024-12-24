import React from 'react';
import { Package } from 'lucide-react';

interface AppIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const CUSTOM_LOGOS: Record<string, string> = {
  'KernelSU': 'https://kernelsu.org/logo.png'
};

export function AppIcon({ name, size = 'md' }: AppIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const customLogo = CUSTOM_LOGOS[name];

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 border border-red-500/20 flex items-center justify-center overflow-hidden`}>
      {customLogo ? (
        <img 
          src={customLogo} 
          alt={`${name} logo`}
          className="w-full h-full object-cover"
        />
      ) : (
        <Package className="w-1/2 h-1/2 text-red-500" />
      )}
    </div>
  );
}