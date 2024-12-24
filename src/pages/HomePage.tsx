import React from 'react';
import { RepositoryCard } from '../components/RepositoryCard';
import { SearchBar } from '../components/SearchBar';
import { Footer } from '../components/Footer';
import { ContactBanner } from '../components/ContactBanner';
import { useSearch } from '../hooks/useSearch';
import repos from '../data/repos.json';
import { getThemeClass, getTextClass } from '../lib/theme';

export function HomePage() {
  const { searchTerm, setSearchTerm, searchResults } = useSearch(repos);

  return (
    <div className={`min-h-screen ${getThemeClass('background', 'bg')} flex flex-col`}>
      <ContactBanner />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className={`text-4xl font-bold ${getTextClass('light')} text-center mb-4`}>
            Open Source Software Explorer
          </h1>
          <p className={`${getTextClass('muted')} text-center mb-12 text-lg`}>
            Discover and download Android development tools
          </p>
          
          <div className="mb-12">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((repo) => (
              <RepositoryCard key={repo.name} repository={repo} />
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="text-center mt-8">
              <p className={getTextClass('muted')}>
                No repositories or files found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}