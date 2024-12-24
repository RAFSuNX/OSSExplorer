import { useState, useMemo } from 'react';
import { Repository, Release } from '../types';
import releasesData from '../data/releases.json';

export function useSearch(repositories: Repository[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return repositories;

    const term = searchTerm.toLowerCase();
    
    return repositories.filter(repo => {
      // Search in repository name and description
      const matchesRepo = 
        repo.name.toLowerCase().includes(term) ||
        repo.description.toLowerCase().includes(term);

      // Search in releases and their files
      const releases = releasesData[repo.name as keyof typeof releasesData] || [];
      const matchesReleases = releases.some((release: Release) =>
        release.assets.some(asset => 
          asset.name.toLowerCase().includes(term)
        )
      );

      return matchesRepo || matchesReleases;
    });
  }, [repositories, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults
  };
}