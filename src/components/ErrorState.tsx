import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
}

export function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}