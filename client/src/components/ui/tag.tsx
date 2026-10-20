import { clsx } from 'clsx';
import { BlurView } from 'expo-blur';
import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

export default function Tag({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <View className="rounded-full overflow-hidden">
      <Text
        className={clsx(
          'text-[10px] font-medium px-2 py-0.5 bg-accent text-foreground/80 rounded-full border border-border',
          className,
        )}>
        {children}
      </Text>
    </View>
  );
}
