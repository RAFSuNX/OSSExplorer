// Theme configuration
export const theme = {
  colors: {
    primary: {
      base: 'red',
      shade: '500'
    },
    background: {
      base: 'gray',
      shade: '950'
    },
    text: {
      light: 'white',
      dark: 'gray-900',
      muted: 'gray-400'
    }
  },
  opacity: {
    hover: '30',
    normal: '20',
    light: '10'
  }
};

export type ThemeColor = keyof typeof theme.colors;

// Generate Tailwind classes based on theme
export const getThemeClass = (
  type: ThemeColor,
  variant: 'bg' | 'text' | 'border' = 'bg',
  opacity?: string
) => {
  const color = theme.colors[type];
  const opacityValue = opacity ? `/${opacity}` : '';
  return `${variant}-${color.base}-${color.shade}${opacityValue}`;
};

// Text color utilities
export const getTextClass = (variant: 'light' | 'dark' | 'muted') => {
  return `text-${theme.colors.text[variant]}`;
};