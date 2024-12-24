import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ChangelogRendererProps {
  content: string;
}

export function ChangelogRenderer({ content }: ChangelogRendererProps) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split content by newlines and process each line
  const processedContent = content.split('\n').map((line, index) => {
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let match;

    // Find all URLs in the line
    while ((match = urlRegex.exec(line)) !== null) {
      // Add text before the URL
      if (match.index > lastIndex) {
        elements.push(line.slice(lastIndex, match.index));
      }

      const url = match[0];
      // Add the URL as a link
      elements.push(
        <a
          key={`link-${index}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 hover:underline"
        >
          here
          <ExternalLink className="w-3 h-3" />
        </a>
      );

      lastIndex = match.index + url.length;
    }

    // Add remaining text after the last URL
    if (lastIndex < line.length) {
      elements.push(line.slice(lastIndex));
    }

    return (
      <p key={index} className="mb-2 last:mb-0">
        {elements.length > 0 ? elements : line}
      </p>
    );
  });

  return <>{processedContent}</>;
}