import React from 'react';

export function Favicon() {
  React.useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/6642eaf2ffcf507fcf883d00_Developer%20velocity.svg';
    document.head.appendChild(link);
  }, []);

  return null;
}