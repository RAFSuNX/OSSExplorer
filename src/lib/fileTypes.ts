interface FileType {
  extension: string;
  description: string;
}

export const FILE_TYPES: FileType[] = [
  { extension: 'apk', description: 'Android Package' },
  { extension: 'ipa', description: 'iOS App Store Package' },
  { extension: 'exe', description: 'Windows Executable' },
  { extension: 'dmg', description: 'macOS Disk Image' },
  { extension: 'deb', description: 'Debian Package' },
  { extension: 'rpm', description: 'Red Hat Package' },
  { extension: 'zip', description: 'Compressed Archive' },
  { extension: 'tar.gz', description: 'Gzipped Tar Archive' },
  { extension: 'img', description: 'Disk Image File' },
  { extension: 'iso', description: 'ISO Image' },
  { extension: 'msi', description: 'Windows Installer' },
  { extension: 'pkg', description: 'macOS Package' },
  { extension: 'appimage', description: 'AppImage Package' },
  { extension: 'snap', description: 'Snap Package' },
  { extension: 'flatpak', description: 'Flatpak Bundle' }
];

export function getFileExtension(filename: string): string {
  const lowerFilename = filename.toLowerCase();
  return FILE_TYPES.find(type => 
    lowerFilename.endsWith(`.${type.extension}`)
  )?.extension || 'unknown';
}