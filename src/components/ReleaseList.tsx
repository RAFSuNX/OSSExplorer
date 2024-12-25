import React from 'react';
import { Release } from '../types';
import { ReleaseCard } from './ReleaseCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ReleaseListProps {
  releases: Release[];
  isFiltering: boolean;
}

export function ReleaseList({ releases, isFiltering }: ReleaseListProps) {
  if (isFiltering) {
    return <LoadingSpinner message="Filtering releases..." />;
  }

  return (
    <div className="space-y-8">
      {releases.map((release) => (
        <ReleaseCard key={release.tag_name} release={release} />
      ))}
    </div>
  );
}