import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-n-8 border-b border-border px-4 pb-3">
      <View className="flex-row items-center justify-between h-12">
        <Text
          className="text-foreground text-lg font-semibold tracking-wide text-center flex-1"
          numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}
