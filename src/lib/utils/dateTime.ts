// Date and time formatting utilities
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short', // Changed from 'long' to 'short' for three-letter month
    day: 'numeric'
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDateTime(date: string): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}