import { useState, useEffect } from 'react';
import { Repository, Release } from '../types';
import repos from '../data/repos.json';
import releasesData from '../data/releases.json';

export function useRepository(name: string | undefined) {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRepository = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay for smoother transitions
        await new Promise(resolve => setTimeout(resolve, 300));

        const repo = repos.find((r) => r.name === name);
        if (!repo) {
          throw new Error('Repository not found');
        }

        setRepository(repo);
        const repoReleases = releasesData[repo.name as keyof typeof releasesData] || [];
        setReleases(repoReleases);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      loadRepository();
    }
  }, [name]);

  return { repository, releases, loading, error };
}