import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Repository } from '../types';
import { AppIcon } from './AppIcon';
import { CategoryChip } from './CategoryChip';

interface RepositoryCardProps {
  repository: Repository;
  index: number;
}

export function RepositoryCard({ repository, index }: RepositoryCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(`/repository/${encodeURIComponent(repository.name)}`)}
      className="bg-gray-900/80 border-2 border-red-500/20 hover:border-red-500/40 rounded-xl p-6 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-red-500/5"
    >
      <div className="flex items-start gap-4">
        <AppIcon name={repository.name} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate mb-2">{repository.name}</h3>
          <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed mb-4">{repository.description}</p>
          <div className="flex flex-wrap gap-2">
            {repository.categories.map((category) => (
              <CategoryChip key={category} category={category} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}