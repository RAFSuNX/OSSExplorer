import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search repositories..."
        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-red-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500/40"
      />
    </div>
  );
}