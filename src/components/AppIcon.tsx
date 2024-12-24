import React from 'react';
import { Package } from 'lucide-react';

interface AppIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const CUSTOM_LOGOS: Record<string, string> = {
  'KernelSU': 'https://kernelsu.org/logo.png'
  'Magisk': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Magisk_Logo.png'
};

export function AppIcon({ name, size = 'md' }: AppIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const customLogo = CUSTOM_LOGOS[name];

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center`}>
      {customLogo ? (
        <img 
          src={customLogo} 
          alt={`${name} logo`}
          className="w-full h-full object-contain"
        />
      ) : (
        <Package className="w-full h-full text-red-500" />
      )}
    </div>
  );
}
