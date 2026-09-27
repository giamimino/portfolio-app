import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme } from 'nativewind';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ThemeKey = '@app-theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await AsyncStorage.getItem(ThemeKey);

      if (
        storedTheme === 'dark' ||
        storedTheme === 'light' ||
        storedTheme === 'system'
      ) {
        setThemeState(storedTheme);
      }
    }

    loadTheme();
  }, []);

  const resolvedTheme =
    theme === 'system'
      ? systemTheme === 'unspecified'
        ? 'light'
        : systemTheme
      : theme;

  const setTheme = async (nextTheme: Theme) => {
    setThemeState(nextTheme);

    await AsyncStorage.setItem(ThemeKey, nextTheme);
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, theme],
  );

  useEffect(() => {
    colorScheme.set(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');

  return ctx;
}
