import { AppProviders } from '@/providers/AppProviders';
import '../../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="projects" options={{ title: 'Projects' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="contact" options={{ title: 'Contact ' }} />
      </Stack>
    </AppProviders>
  );
}
