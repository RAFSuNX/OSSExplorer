import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DownloadButtonProps {
  url: string;
  fileName: string;
}

export function DownloadButton({ url, fileName }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    
    // Click the link
    link.click();
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDownload}
      disabled={isLoading}
      className="bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/40 hover:border-violet-500/60 text-violet-400 px-6 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download</span>
        </>
      )}
    </motion.button>
  );
}