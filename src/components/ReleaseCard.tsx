import React from 'react';
import { Tag, Download } from 'lucide-react';
import { Release, Asset } from '../types';
import { formatBytes, formatDate } from '../lib/utils';
import { AssetTypeBadge } from './AssetTypeBadge';
import { ChangelogRenderer } from './ChangelogRenderer';

interface AssetRowProps {
  asset: Asset;
}

function AssetRow({ asset }: AssetRowProps) {
  return (
    <div className="bg-gray-900 border border-violet-500/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-500/30 transition-colors">
      <div className="min-w-0">
        <div className="font-medium flex items-center gap-2 flex-wrap text-gray-200">
          <span className="truncate">{asset.name}</span>
          <AssetTypeBadge filename={asset.name} />
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {formatBytes(asset.size)} • {asset.download_count.toLocaleString()} downloads
        </div>
      </div>
      <a
        href={asset.browser_download_url}
        className="bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/40 hover:border-violet-500/60 text-violet-400 px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  );
}

export function ReleaseCard({ release }: { release: Release }) {
  return (
    <div className="bg-gray-900 border border-violet-500/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Tag className="w-5 h-5 text-violet-400" />
        <h2 className="text-xl font-semibold text-white">{release.name}</h2>
        <span className="text-sm text-gray-400 ml-auto">
          {formatDate(release.published_at)}
        </span>
      </div>
      
      <div className="bg-gray-950 border border-violet-500/10 rounded-lg p-5 mb-6">
        <ChangelogRenderer content={release.body} />
      </div>
      
      <div className="space-y-3">
        {release.assets.map((asset) => (
          <AssetRow key={asset.name} asset={asset} />
        ))}
      </div>
    </div>
  );
}