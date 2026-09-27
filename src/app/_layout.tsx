import { AppProviders } from '@/providers/AppProviders';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import '../../global.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GoogleSansFlex-Regular': require('../../assets/fonts/Google_Sans_Flex/GoogleSansFlex_9pt-Regular.ttf'),
    'GoogleSansFlex-Medium': require('../../assets/fonts/Google_Sans_Flex/GoogleSansFlex_9pt-Medium.ttf'),
    'GoogleSansFlex-SemiBold': require('../../assets/fonts/Google_Sans_Flex/GoogleSansFlex_9pt-SemiBold.ttf'),
    'GoogleSansFlex-Bold': require('../../assets/fonts/Google_Sans_Flex/GoogleSansFlex_9pt-Bold.ttf'),
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
