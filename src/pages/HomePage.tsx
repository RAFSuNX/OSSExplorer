import React, { useState, useMemo } from 'react';
import { RepositoryCard } from '../components/RepositoryCard';
import { SearchBar } from '../components/SearchBar';
import { Repository } from '../types';
import repos from '../data/repos.json';

export function HomePage() {
  const [search, setSearch] = useState('');

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => 
      search === '' || 
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Open Source Repository Hub
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">
          Discover and download Android development tools
        </p>
        
        <div className="mb-12">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <RepositoryCard key={repo.name} repository={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}