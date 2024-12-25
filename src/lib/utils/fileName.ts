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