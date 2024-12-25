import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Repository, Release } from '../types';
import { ReleaseCard } from '../components/ReleaseCard';
import { AppIcon } from '../components/AppIcon';
import { CategoryChip } from '../components/CategoryChip';
import { FileTypeFilter } from '../components/FileTypeFilter';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorState } from '../components/ErrorState';
import { PageTransition } from '../components/PageTransition';
import { useRepository } from '../hooks/useRepository';
import { getFileExtension } from '../lib/fileTypes';

export function RepositoryPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { repository, releases, loading, error } = useRepository(name);
  const [selectedFileType, setSelectedFileType] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredReleases = React.useMemo(() => {
    if (!releases) return [];
    return releases
      .map(release => ({
        ...release,
        assets: release.assets.filter(asset => {
          const matchesType = selectedFileType === '' || getFileExtension(asset.name) === selectedFileType;
          const matchesSearch = searchTerm === '' || 
            asset.name.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesType && matchesSearch;
        })
      }))
      .filter(release => release.assets.length > 0);
  }, [releases, selectedFileType, searchTerm]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-1">
          <ErrorState 
            title="Repository not found"
            message="The repository you're looking for doesn't exist or has been moved."
          />
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mx-auto transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to repositories
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button
                onClick={() => navigate('/')}
                className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to repositories
              </button>

              {loading ? (
                <LoadingSpinner />
              ) : repository ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <div className="space-y-8">
                    <div className="bg-gray-900/80 border-2 border-violet-500/20 rounded-xl p-8 backdrop-blur-sm">
                      <div className="flex items-center gap-6">
                        <AppIcon name={repository.name} size="lg" />
                        <div>
                          <h1 className="text-3xl font-bold text-white mb-3">{repository.name}</h1>
                          <p className="text-gray-400 text-lg">{repository.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {repository.categories.map((category) => (
                              <CategoryChip key={category} category={category} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search files..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-violet-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/40"
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-64">
                        <FileTypeFilter
                          selectedType={selectedFileType}
                          onChange={setSelectedFileType}
                        />
                      </div>
                    </div>

                    {filteredReleases.length > 0 ? (
                      <div className="space-y-8">
                        {filteredReleases.map((release) => (
                          <ReleaseCard key={release.tag_name} release={release} />
                        ))}
                      </div>
                    ) : (
                      <ErrorState
                        title="No releases found"
                        message={selectedFileType 
                          ? `No releases found with ${selectedFileType.toUpperCase()} files.`
                          : 'No releases available for this repository.'}
                      />
                    )}
                  </div>
                </Suspense>
              ) : null}
            </div>
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}