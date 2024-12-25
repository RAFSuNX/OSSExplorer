export const FILE_EXTENSIONS = {
  APK: 'apk',
  ZIP: 'zip',
} as const;

export type FileExtension = typeof FILE_EXTENSIONS[keyof typeof FILE_EXTENSIONS];

export const DEFAULT_FILE_TYPES = [FILE_EXTENSIONS.APK, FILE_EXTENSIONS.ZIP] as const;