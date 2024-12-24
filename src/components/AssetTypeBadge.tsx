import React from 'react';
import { getFileExtension } from '../lib/fileTypes';

interface AssetTypeBadgeProps {
  filename: string;
}

const badgeStyles: Record<string, string> = {
  'apk': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'ipa': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'exe': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'dmg': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'deb': 'bg-red-500/20 text-red-400 border-red-500/30',
  'rpm': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'zip': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'tar.gz': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'img': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'iso': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'msi': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'pkg': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'appimage': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  'snap': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'flatpak': 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  'unknown': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

export function AssetTypeBadge({ filename }: AssetTypeBadgeProps) {
  const extension = getFileExtension(filename);
  
  return (
    <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${badgeStyles[extension] || badgeStyles.unknown}`}>
      {extension.toUpperCase()}
    </span>
  );
}