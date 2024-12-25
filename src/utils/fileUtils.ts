import { Release } from '../types';
import { getFileExtension } from '../lib/fileTypes';
import { FILE_EXTENSIONS, FileExtension } from '../constants/fileTypes';

export function detectDefaultFileType(releases: Release[]): FileExtension {
  const hasApkFiles = releases.some(release => 
    release.assets.some(asset => getFileExtension(asset.name) === FILE_EXTENSIONS.APK)
  );

  return hasApkFiles ? FILE_EXTENSIONS.APK : FILE_EXTENSIONS.ZIP;
}