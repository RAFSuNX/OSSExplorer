import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Repository, Release } from '../types';
import { ReleaseCard } from '../components/ReleaseCard';
import { AppIcon } from '../components/AppIcon';
import { CategoryChip } from '../components/CategoryChip';
import { FileTypeFilter } from '../components/FileTypeFilter';
import { Footer } from '../components/Footer';
import { getFileExtension } from '../lib/fileTypes';
import repos from '../data/repos.json';
import releasesData from '../data/releases.json';

export function RepositoryPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFileType, setSelectedFileType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const repo = repos.find((r) => r.name === name);
    if (repo) {
      setRepository(repo);
      const repoReleases = releasesData[repo.name as keyof typeof releasesData] || [];
      setReleases(repoReleases);
    }
    setLoading(false);
  }, [name]);

  const filteredReleases = releases
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

  if (!repository) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Repository not found</h2>
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-gray-400 hover:text-white mx-auto transition-colors"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to repositories
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to repositories
          </button>

          <div className="bg-gray-900/80 border-2 border-violet-500/20 rounded-xl p-8 mb-12 backdrop-blur-sm">
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

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-violet-500/40 mx-auto mb-4" />
              <p className="text-gray-400">Loading releases...</p>
            </div>
          ) : filteredReleases.length > 0 ? (
            <div className="space-y-8">
              {filteredReleases.map((release) => (
                <ReleaseCard key={release.tag_name} release={release} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {selectedFileType 
                  ? `No releases found with ${selectedFileType.toUpperCase()} files.`
                  : 'No releases available for this repository.'}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}