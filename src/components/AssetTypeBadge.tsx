import React from 'react';

type AssetType = 'apk' | 'magisk-module' | 'unknown';

interface AssetTypeBadgeProps {
  filename: string;
}

const getAssetType = (filename: string): AssetType => {
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.endsWith('.apk')) return 'apk';
  // Check if it's a Magisk module by looking for "magisk" in the filename
  // but exclude Magisk's own zip files from the main Magisk repository
  if (lowerFilename.includes('magisk') && lowerFilename.endsWith('.zip')) return 'magisk-module';
  return 'unknown';
};

const badgeStyles: Record<AssetType, string> = {
  'apk': 'bg-green-500/20 text-green-400 border-green-500/30',
  'magisk-module': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'unknown': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

export function AssetTypeBadge({ filename }: AssetTypeBadgeProps) {
  const type = getAssetType(filename);
  const label = type === 'apk' ? 'APK' : type === 'magisk-module' ? 'Magisk Module' : 'Unknown';
  
  return (
    <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${badgeStyles[type]}`}>
      {label}
    </span>
  );
}