import React from 'react';
import { Filter } from 'lucide-react';
import { FILE_TYPES } from '../lib/fileTypes';

interface FileTypeFilterProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export function FileTypeFilter({ selectedType, onChange }: FileTypeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-500" />
      <select
        value={selectedType}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 border border-red-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500/40 w-64"
      >
        <option value="">All File Types</option>
        {FILE_TYPES.map(({ extension, description }) => (
          <option key={extension} value={extension}>
            {extension.toUpperCase()} - {description}
          </option>
        ))}
      </select>
    </div>
  );
}