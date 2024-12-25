import { useState, useMemo } from 'react';
import { Release } from '../types';
import { getFileExtension } from '../lib/fileTypes';
import { useDebounce } from './useDebounce';

export function useFilteredReleases(releases: Release[], fileType: string, searchTerm: string) {
  const [isFiltering, setIsFiltering] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const filteredReleases = useMemo(() => {
    if (!releases?.length) return [];
    
    setIsFiltering(true);
    
    const filtered = releases
      .map(release => ({
        ...release,
        assets: release.assets.filter(asset => {
          if (fileType && getFileExtension(asset.name) !== fileType) return false;
          if (debouncedSearchTerm && !asset.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) return false;
          return true;
        })
      }))
      .filter(release => release.assets.length > 0);

    // Use requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => setIsFiltering(false));
    
    return filtered;
  }, [releases, fileType, debouncedSearchTerm]);

  return {
    filteredReleases,
    isFiltering,
  };
}