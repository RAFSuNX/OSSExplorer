import { useMemo } from 'react';
import { Release } from '../types';
import { FileExtension } from '../constants/fileTypes';
import { detectDefaultFileType } from '../utils/fileUtils';

export function useDefaultFileType(releases: Release[]): FileExtension {
  return useMemo(() => detectDefaultFileType(releases), [releases]);
}