import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver();
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse rounded-lg">
          <span className="text-xs text-gray-400">Loading...</span>
        </div>
      )}
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}