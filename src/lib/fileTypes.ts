interface FileType {
  extension: string;
  description: string;
}

export const FILE_TYPES: FileType[] = [
  { extension: 'apk', description: 'Android Package (Mobile apps for Android)' },
  { extension: 'ipa', description: 'iOS App Store Package (Mobile apps for iOS)' },
  { extension: 'exe', description: 'Windows Executable (Programs for Windows)' },
  { extension: 'dmg', description: 'Disk Image (macOS application installers)' },
  { extension: 'deb', description: 'Debian Package (Linux software for Debian-based systems)' },
  { extension: 'rpm', description: 'Red Hat Package (Linux software for RHEL-based systems)' },
  { extension: 'zip', description: 'Compressed Archive (General purpose compression)' },
  { extension: 'tar.gz', description: 'Gzipped Tar Archive (Common in Linux/Unix)' },
  { extension: 'img', description: 'Disk Image File (Raw disk/device images)' },
  { extension: 'iso', description: 'ISO Image (CD/DVD/disk images)' },
  { extension: 'msi', description: 'Windows Installer (Microsoft Installation Package)' },
  { extension: 'pkg', description: 'Package File (macOS installer package)' },
  { extension: 'appimage', description: 'AppImage (Universal Linux applications)' },
  { extension: 'snap', description: 'Snap Package (Universal Linux package format)' },
  { extension: 'flatpak', description: 'Flatpak Bundle (Universal Linux package format)' }
];

export const getFileExtension = (filename: string): string => {
  const lowerFilename = filename.toLowerCase();
  return FILE_TYPES.find(type => 
    lowerFilename.endsWith(`.${type.extension}`)
  )?.extension || 'unknown';
};