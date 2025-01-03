import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatFileName(fileName: string): string {
  // Remove version numbers (e.g., v1.2.3 or 1.2.3)
  let formatted = fileName.replace(/(v?\d+\.\d+\.\d+[-.]?)/g, '');
  
  // Remove common prefixes
  formatted = formatted.replace(/^(release[-.]|build[-.]|version[-.])/i, '');
  
  // Remove timestamps (e.g., 20240315 or 2024.03.15)
  formatted = formatted.replace(/\d{8}|\d{4}[-_.]\d{2}[-_.]\d{2}/g, '');
  
  // Replace underscores and dots with spaces (except for file extension)
  const extension = formatted.split('.').pop();
  const name = formatted.slice(0, -(extension?.length ?? 0) - 1);
  formatted = name.replace(/[-_.]/g, ' ') + '.' + extension;
  
  // Clean up multiple spaces
  formatted = formatted.replace(/\s+/g, ' ').trim();
  
  // Capitalize first letter of each word
  formatted = formatted.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    
  return formatted;
}