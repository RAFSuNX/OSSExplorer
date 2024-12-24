import React from 'react';

interface CategoryChipProps {
  category: string;
}

export function CategoryChip({ category }: CategoryChipProps) {
  return (
    <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-red-500/10 text-red-400 border border-red-500/20">
      {category}
    </span>
  );
}