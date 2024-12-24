import React from 'react';

interface CategoryChipProps {
  category: string;
}

export function CategoryChip({ category }: CategoryChipProps) {
  return (
    <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
      {category}
    </span>
  );
}