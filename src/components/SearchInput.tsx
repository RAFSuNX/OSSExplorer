import React, { memo } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = memo(function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search files..." 
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-violet-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/40"
      />
    </div>
  );
});