import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

export default function Tag({ children }: PropsWithChildren) {
  return (
    <Text className="text-[10px] font-medium px-2 py-0.5 bg-foreground/20 backdrop-blur-lf text-foreground/80 rounded-full border border-border/20">
      {children}
    </Text>
  );
}
