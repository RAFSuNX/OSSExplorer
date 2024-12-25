import React from 'react';
import { Tag, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Release, Asset } from '../types';
import { formatBytes, formatDate } from '../lib/utils';
import { AssetTypeBadge } from './AssetTypeBadge';
import { ArchitectureBadge } from './ArchitectureBadge';
import { ChangelogRenderer } from './ChangelogRenderer';

interface AssetRowProps {
  asset: Asset;
  index: number;
}

function AssetRow({ asset, index }: AssetRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900 border border-violet-500/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-500/30 transition-colors"
    >
      <div className="min-w-0">
        <div className="font-medium flex items-center gap-2 flex-wrap text-gray-200">
          <span className="truncate">{asset.name}</span>
          <div className="flex gap-2">
            <AssetTypeBadge filename={asset.name} />
            <ArchitectureBadge filename={asset.name} />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {formatBytes(asset.size)} • {asset.download_count.toLocaleString()} downloads
        </div>
      </div>
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={asset.browser_download_url}
        className="bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/40 hover:border-violet-500/60 text-violet-400 px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Download className="w-4 h-4" />
        Download
      </motion.a>
    </motion.div>
  );
}

export function ReleaseCard({ release }: { release: Release }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-violet-500/20 rounded-xl p-6"
    >
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
        {release.assets.map((asset, index) => (
          <AssetRow key={asset.name} asset={asset} index={index} />
        ))}
      </div>
    </motion.div>
  );
}