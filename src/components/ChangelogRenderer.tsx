import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ChangelogRendererProps {
  content: string;
}

export function ChangelogRenderer({ content }: ChangelogRendererProps) {
  const processText = (text: string) => {
    // Replace "here" links with their actual text
    text = text.replace(/\[here\]\((.*?)\)/g, (_, url) => {
      const urlObj = new URL(url);
      const displayText = urlObj.pathname.split('/').pop() || 'link';
      return `[${displayText}](${url})`;
    });

    // Process markdown links and URLs
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Combined pattern for both markdown links and plain URLs
    const pattern = /(?:\[(.*?)\]\((.*?)\))|(https?:\/\/[^\s)\]]+)/g;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }

      if (match[1] && match[2]) {
        // Markdown link
        elements.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 hover:underline"
          >
            {match[1]}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      } else if (match[3]) {
        // Plain URL
        const url = match[3];
        const displayText = url.split('/').pop() || 'link';
        elements.push(
          <a
            key={`link-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 hover:underline"
          >
            {displayText}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return elements;
  };

  return (
    <div className="text-gray-300 space-y-2">
      {content.split('\n').map((line, index) => (
        <p key={index} className="text-gray-300">
          {processText(line)}
        </p>
      ))}
    </div>
  );
}