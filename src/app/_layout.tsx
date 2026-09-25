import { AppProviders } from '@/providers/AppProviders';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import '../../global.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GoogleSansFlex-Regular': require('../assets/fonts/GoogleSansFlex-Regular.ttf'),
    'GoogleSansFlex-Medium': require('../assets/fonts/GoogleSansFlex-Medium.ttf'),
    'GoogleSansFlex-SemiBold': require('../assets/fonts/GoogleSansFlex-SemiBold.ttf'),
    'GoogleSansFlex-Bold': require('../assets/fonts/GoogleSansFlex-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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
