import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-violet-500/40 mb-4" />
      <p className="text-gray-400 animate-pulse">Loading...</p>
    </div>
  );
}