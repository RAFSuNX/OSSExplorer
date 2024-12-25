export interface Architecture {
  pattern: RegExp;
  name: string;
  description: string;
}

export const ARCHITECTURES: Architecture[] = [
  { 
    pattern: /arm64|aarch64/i, 
    name: 'ARM64', 
    description: '64-bit ARM architecture'
  },
  {
    pattern: /armeabi|armv7|arm32|arm(?!64)/i,
    name: 'ARM',
    description: '32-bit ARM architecture'
  },
  {
    pattern: /x86_64|amd64/i,
    name: 'x64',
    description: '64-bit x86 architecture'
  },
  {
    pattern: /x86|i386|i686/i,
    name: 'x86',
    description: '32-bit x86 architecture'
  },
  {
    pattern: /universal|all/i,
    name: 'Universal',
    description: 'All architectures supported'
  }
];

export function detectArchitecture(filename: string): Architecture | null {
  return ARCHITECTURES.find(arch => arch.pattern.test(filename)) || null;
}