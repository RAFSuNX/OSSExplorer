import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Release } from '../types';
import { ReleaseCard } from './ReleaseCard';
import { LoadingSpinner } from './LoadingSpinner';

interface VirtualizedReleaseListProps {
  releases: Release[];
  isFiltering: boolean;
}

export function VirtualizedReleaseList({ releases, isFiltering }: VirtualizedReleaseListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: releases.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Increased height estimate
    overscan: 5,
    paddingStart: 8, // Add padding at the start
    paddingEnd: 8, // Add padding at the end
  });

  if (isFiltering) {
    return <LoadingSpinner message="Filtering releases..." />;
  }

  return (
    <div ref={parentRef} className="h-[800px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
              paddingBottom: '2rem', // Add spacing between cards
            }}
          >
            <ReleaseCard release={releases[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}