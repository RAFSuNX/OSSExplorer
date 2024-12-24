import React from 'react';
import { getThemeClass } from '../../lib/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const variants = {
  primary: 'red',
  secondary: 'gray',
  success: 'green',
  warning: 'yellow',
  error: 'red'
};

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const baseColor = variants[variant];
  
  return (
    <span className={`
      px-2 py-0.5 
      text-xs font-medium 
      border rounded-full 
      ${getThemeClass('primary', 'bg', '20')}
      ${getThemeClass('primary', 'text')}
      ${getThemeClass('primary', 'border', '30')}
    `}>
      {children}
    </span>
  );
}