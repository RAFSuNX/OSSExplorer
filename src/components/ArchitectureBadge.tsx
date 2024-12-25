import React from 'react';
import { Cpu } from 'lucide-react';
import { detectArchitecture } from '../lib/architectures';

interface ArchitectureBadgeProps {
  filename: string;
}

export function ArchitectureBadge({ filename }: ArchitectureBadgeProps) {
  const architecture = detectArchitecture(filename);
  
  if (!architecture) return null;

  return (
    <span className="px-2 py-0.5 text-xs font-medium border rounded-full bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
      <Cpu className="w-3 h-3" />
      {architecture.name}
    </span>
  );
}