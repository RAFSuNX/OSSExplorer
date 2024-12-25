import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RepositoryCard } from '../components/RepositoryCard';
import { SearchBar } from '../components/SearchBar';
import { Footer } from '../components/Footer';
import { ContactBanner } from '../components/ContactBanner';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PageTransition } from '../components/PageTransition';
import { useSearch } from '../hooks/useSearch';
import { getThemeClass, getTextClass } from '../lib/theme';
import repos from '../data/repos.json';

export function HomePage() {
  const { searchTerm, setSearchTerm, searchResults } = useSearch(repos);

  return (
    <div className={`min-h-screen ${getThemeClass('background', 'bg')} flex flex-col`}>
      <ContactBanner />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h1 className={`text-4xl font-bold ${getTextClass('light')} text-center mb-4`}>
                Open Source Software Explorer
              </h1>
              <p className={`${getTextClass('muted')} text-center mb-12 text-lg`}>
                Discover and download Android development tools
              </p>
              
              <div className="mb-12">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>

              <Suspense fallback={<LoadingSpinner message="Loading repositories..." />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((repo, index) => (
                    <RepositoryCard key={repo.name} repository={repo} index={index} />
                  ))}
                </div>

                {searchResults.length === 0 && (
                  <div className="text-center mt-8">
                    <p className={getTextClass('muted')}>
                      No repositories or files found matching your search.
                    </p>
                  </div>
                )}
              </Suspense>
            </div>
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}