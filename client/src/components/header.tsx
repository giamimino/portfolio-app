import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from './ui/button';
import { useTheme } from '@/providers/ThemeProvider';

export function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-n-8 border-b border-border px-4 pb-3">
      <View className="flex-row items-center h-12">
        <View className="flex-1" />

        <View className="flex-1 flex-row items-center justify-center">
          <Text
            className="text-foreground text-lg font-semibold tracking-wide text-center flex-1"
            numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-end">
          <Button
            size={'sm'}
            className="bg-transparent border border-border active:opacity-0 active:bg-transparent"
            onPress={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }>
            <Text className="text-foreground">
              {resolvedTheme === 'light' ? (
                <Feather name="sun" size={12} />
              ) : (
                <AntDesign name="moon" size={12} />
              )}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
