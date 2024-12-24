import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ChangelogRendererProps {
  content: string;
}

export function ChangelogRenderer({ content }: ChangelogRendererProps) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const processedContent = content.split('\n').map((line, index) => {
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let match;

    while ((match = urlRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(line.slice(lastIndex, match.index));
      }

      const url = match[0];
      elements.push(
        <a
          key={`link-${index}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 hover:underline"
        >
          here
          <ExternalLink className="w-3 h-3" />
        </a>
      );

      lastIndex = match.index + url.length;
    }

    if (lastIndex < line.length) {
      elements.push(line.slice(lastIndex));
    }

    return (
      <p key={index} className="text-gray-300 mb-2 last:mb-0">
        {elements.length > 0 ? elements : line}
      </p>
    );
  });

  return <div className="text-gray-300">{processedContent}</div>;
}