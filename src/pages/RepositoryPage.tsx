import React, { Suspense, memo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { AppIcon } from '../components/AppIcon';
import { CategoryChip } from '../components/CategoryChip';
import { FileTypeFilter } from '../components/FileTypeFilter';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorState } from '../components/ErrorState';
import { PageTransition } from '../components/PageTransition';
import { SearchInput } from '../components/SearchInput';
import { ReleaseList } from '../components/ReleaseList';
import { useRepository } from '../hooks/useRepository';
import { useFilteredReleases } from '../hooks/useFilteredReleases';
import { useDefaultFileType } from '../hooks/useDefaultFileType';
import { FileExtension } from '../constants/fileTypes';

const RepositoryHeader = memo(function RepositoryHeader({ 
  name, 
  description, 
  categories 
}: { 
  name: string; 
  description: string; 
  categories: string[]; 
}) {
  return (
    <div className="bg-gray-900/80 border-2 border-violet-500/20 rounded-xl p-8 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <AppIcon name={name} size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">{name}</h1>
          <p className="text-gray-400 text-lg">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <CategoryChip key={category} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export function RepositoryPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { repository, releases, loading, error } = useRepository(name);
  const defaultFileType = useDefaultFileType(releases);
  const [selectedFileType, setSelectedFileType] = React.useState<FileExtension | ''>('');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const { filteredReleases, isFiltering } = useFilteredReleases(
    releases,
    selectedFileType,
    searchTerm
  );

  useEffect(() => {
    if (releases.length > 0) {
      setSelectedFileType(defaultFileType);
    }
  }, [releases, defaultFileType]);

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
                <LoadingSpinner message="Loading repository details..." />
              ) : repository ? (
                <Suspense fallback={<LoadingSpinner message="Loading releases..." />}>
                  <div className="space-y-8">
                    <RepositoryHeader 
                      name={repository.name}
                      description={repository.description}
                      categories={repository.categories}
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <SearchInput
                          value={searchTerm}
                          onChange={setSearchTerm}
                        />
                      </div>
                      <div className="w-full sm:w-64">
                        <FileTypeFilter
                          selectedType={selectedFileType}
                          onChange={setSelectedFileType}
                        />
                      </div>
                    </div>

                    <ReleaseList 
                      releases={filteredReleases}
                      isFiltering={isFiltering}
                    />
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