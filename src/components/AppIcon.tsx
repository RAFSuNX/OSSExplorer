import React from 'react';
import { Package } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface AppIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const CUSTOM_LOGOS: Record<string, string> = {
  'KernelSU': 'https://kernelsu.org/logo.png',
  'Magisk': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Magisk_Logo.png',
  'Signal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/900px-Signal-Logo.svg.png',
  'Brave': 'https://avatars.githubusercontent.com/u/12301619?s=200&v=4',
  'Termux Monet': 'https://avatars.githubusercontent.com/u/173825319?s=200&v=4',
  'Revanced Builds - J-HC': 'https://avatars.githubusercontent.com/u/101597779?s=200&v=4',
  'ProtonVPN': 'https://vpncdn.protonweb.com/image-transformation/?s=c&image=image%2Fupload%2Fv1703162849%2Fstatic%2Flogos%2Ficons%2Fvpn_f9embt.svg'
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
        <LazyImage 
          src={customLogo} 
          alt={`${name} logo`}
          className="w-full h-full object-contain rounded-lg"
        />
      ) : (
        <Package className="w-full h-full text-red-500" />
      )}
    </div>
  );
}
