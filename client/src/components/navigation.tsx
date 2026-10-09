import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './ui/Text';
import { Href, router, usePathname } from 'expo-router';
import { Button } from './ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { clsx } from 'clsx';

const pages: { title: string; path: Href }[] = [
  { title: 'Projects', path: '/projects' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View
      style={{ paddingBottom: insets.bottom + 25 }}
      className="absolute left-0 bottom-0 right-0 items-center">
      <View className="flex-row rounded-lg items-center justify-center gap-5 border border-border bg-n-8 px-4 py-3">
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text className="text-xl font-extrabold">GM</Text>
        </TouchableOpacity>

        <View className="flex-row items-center">
          {pages.map(page => (
            <Button
              key={`${page.title}-${page.path}`}
              onPress={() => router.push(page.path)}
              className={clsx(
                'bg-transparent border-2',
                pathname.startsWith(page.path.toString())
                  ? 'border-border'
                  : 'border-transparent',
              )}>
              <Text className="text-foreground">{page.title}</Text>
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Navigation;
