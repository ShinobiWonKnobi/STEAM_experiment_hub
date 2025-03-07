import { createTheme, Theme, ThemeOptions, Components } from '@mui/material/styles';
import { CSSObject } from '@mui/material';
import { useAccessibilityStore } from './stores/accessibilityStore';
import { useMemo } from 'react';

// Define custom colors
const colors = {
  primary: {
    main: '#2563eb',
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#7c3aed',
    light: '#a78bfa',
    dark: '#5b21b6',
    contrastText: '#ffffff',
  },
  success: {
    main: '#059669',
    light: '#34d399',
    dark: '#047857',
    contrastText: '#ffffff',
  },
  error: {
    main: '#dc2626',
    light: '#f87171',
    dark: '#b91c1c',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#d97706',
    light: '#fbbf24',
    dark: '#b45309',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0284c7',
    light: '#38bdf8',
    dark: '#0369a1',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Define custom shadows
const shadows = [
  'none',
  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ...Array(18).fill('none'), // Fill remaining shadows with 'none'
];

interface ExtendedThemeComponents extends Components {
  MuiButton?: {
    styleOverrides?: {
      root?: CSSObject;
    };
  };
  MuiCssBaseline?: {
    styleOverrides?: {
      body?: CSSObject;
      '*'?: CSSObject;
    };
  };
}

export const baseTheme = createTheme({
  palette: colors,
  shadows: shadows as any,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          transition: 'all 0.2s ease-in-out',
        } as CSSObject,
        contained: {
          boxShadow: shadows[1],
          '&:hover': {
            boxShadow: shadows[2],
            transform: 'translateY(-1px)',
          },
        } as CSSObject,
        outlined: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        } as CSSObject,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: shadows[2],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
          boxShadow: shadows[4],
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          overflow: 'hidden',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b7280 #f3f4f6",
          "&::-webkit-scrollbar": {
            width: '0.75rem',
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f3f4f6",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6b7280",
            borderRadius: '0.375rem',
            border: '2px solid #f3f4f6',
            '&:hover': {
              backgroundColor: "#4b5563",
            },
          },
        } as CSSObject,
      },
    },
  } as ExtendedThemeComponents,
});

interface AccessibilityOptions {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  colorBlindMode: boolean;
  dyslexiaFriendlyFont: boolean;
  screenReaderOptimized: boolean;
  keyboardNavigationEnhanced: boolean;
}

export const createAccessibleTheme = ({
  highContrast,
  largeText,
  reducedMotion,
  colorBlindMode,
  dyslexiaFriendlyFont,
  screenReaderOptimized,
  keyboardNavigationEnhanced,
}: AccessibilityOptions): Theme => {
  // Create a base theme
  return createTheme({
    palette: {
      mode: highContrast ? 'dark' : 'light',
      primary: {
        main: colorBlindMode ? '#0000FF' : '#1976d2',
        light: colorBlindMode ? '#4444FF' : '#42a5f5',
        dark: colorBlindMode ? '#0000CC' : '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: colorBlindMode ? '#FF8000' : '#9c27b0',
        light: colorBlindMode ? '#FFA040' : '#ba68c8',
        dark: colorBlindMode ? '#CC6600' : '#7b1fa2',
        contrastText: '#ffffff',
      },
      error: {
        main: colorBlindMode ? '#FF0000' : '#d32f2f',
        contrastText: '#ffffff',
      },
      warning: {
        main: colorBlindMode ? '#FFD700' : '#ed6c02',
        contrastText: '#ffffff',
      },
      info: {
        main: colorBlindMode ? '#00FFFF' : '#0288d1',
        contrastText: '#ffffff',
      },
      success: {
        main: colorBlindMode ? '#00FF00' : '#2e7d32',
        contrastText: '#ffffff',
      },
      background: {
        default: highContrast ? '#000000' : '#f5f5f5',
        paper: highContrast ? '#121212' : '#ffffff',
      },
      text: {
        primary: highContrast ? '#FFFFFF' : '#212121',
        secondary: highContrast ? '#CCCCCC' : '#757575',
      },
    },
    typography: {
      fontFamily: dyslexiaFriendlyFont 
        ? '"OpenDyslexic", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: largeText ? 16 : 14,
      h1: {
        fontSize: largeText ? '2.8rem' : '2.5rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      h2: {
        fontSize: largeText ? '2.3rem' : '2rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      h3: {
        fontSize: largeText ? '2rem' : '1.75rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      h4: {
        fontSize: largeText ? '1.8rem' : '1.5rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      h5: {
        fontSize: largeText ? '1.5rem' : '1.25rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      h6: {
        fontSize: largeText ? '1.3rem' : '1.1rem',
        lineHeight: largeText ? 1.3 : 1.2,
      },
      body1: {
        fontSize: largeText ? '1.1rem' : '1rem',
        lineHeight: largeText ? 1.6 : 1.5,
      },
      body2: {
        fontSize: largeText ? '1rem' : '0.875rem',
        lineHeight: largeText ? 1.6 : 1.5,
      },
      button: {
        fontSize: largeText ? '1rem' : '0.875rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*, *::before, *::after': reducedMotion ? {
            transition: 'none !important',
            animation: 'none !important',
          } : undefined,
          body: {
            transition: reducedMotion ? 'none' : undefined,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: reducedMotion,
        },
        styleOverrides: {
          root: keyboardNavigationEnhanced ? {
            '&:focus-visible': {
              outline: `3px solid ${colorBlindMode ? '#FF8000' : '#9c27b0'}`,
              outlineOffset: '2px',
            },
          } : undefined,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: highContrast ? {
            border: '2px solid',
            borderColor: colorBlindMode ? '#0000FF' : '#1976d2',
          } : undefined,
        },
      },
      MuiLink: {
        defaultProps: {
          underline: screenReaderOptimized ? 'always' : 'hover',
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 'medium',
          },
        },
      },
    },
  });
};

export const useTheme = (): Theme => {
  const {
    highContrast,
    largeText,
    reducedMotion,
    colorBlindMode,
    dyslexiaFriendlyFont,
    screenReaderOptimized,
    keyboardNavigationEnhanced,
  } = useAccessibilityStore();

  return useMemo(
    () =>
      createAccessibleTheme({
        highContrast,
        largeText,
        reducedMotion,
        colorBlindMode,
        dyslexiaFriendlyFont,
        screenReaderOptimized,
        keyboardNavigationEnhanced,
      }),
    [
      highContrast,
      largeText,
      reducedMotion,
      colorBlindMode,
      dyslexiaFriendlyFont,
      screenReaderOptimized,
      keyboardNavigationEnhanced,
    ]
  );
};

export default baseTheme; 