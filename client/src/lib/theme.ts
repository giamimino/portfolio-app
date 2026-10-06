import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from 'expo-router/react-navigation';

export const THEME = {
  light: {
    background: '#fff',
    foreground: '#0a0a0a',

    card: '#ffffff',
    cardForeground: '#0a0a0a',

    popover: '#ffffff',
    popoverForeground: '#0a0a0a',

    primary: '#171717',
    primaryForeground: '#fafafa',

    secondary: '#f5f5f5',
    secondaryForeground: '#171717',

    muted: '#f5f5f5',
    mutedForeground: '#737373',

    accent: '#f5f5f5',
    accentForeground: '#171717',

    destructive: '#ef4444',

    border: '#e5e5e5',
    input: '#e5e5e5',
    ring: '#a1a1a1',

    radius: '0.625rem',

    chart1: '#e76e4b',
    chart2: '#2a9d8f',
    chart3: '#264653',
    chart4: '#e9c46a',
    chart5: '#f4a261',

    n2: '#262626',
    n8: '#fafafa',
    n3: '#737373',

    default: '#fff',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',

    card: '#0a0a0a',
    cardForeground: '#fafafa',

    popover: '#0a0a0a',
    popoverForeground: '#fafafa',

    primary: '#fafafa',
    primaryForeground: '#171717',

    secondary: '#262626',
    secondaryForeground: '#fafafa',

    muted: '#262626',
    mutedForeground: '#a3a3a3',

    accent: '#262626',
    accentForeground: '#fafafa',

    destructive: '#e43d3d',

    border: '#262626',
    input: '#262626',
    ring: '#737373',

    chart1: '#3b82f6',
    chart2: '#2dbd9f',
    chart3: '#f28c28',
    chart4: '#9b5de5',
    chart5: '#e83e8c',

    n2: '#e5e5e5',
    n8: '#101010',
    n3: '#a3a3a3',

    default: '#000',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
