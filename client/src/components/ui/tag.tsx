import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

export default function Tag({ children }: PropsWithChildren) {
  return (
    <Text className="py-0.5 text-sm bg-dark-02/80 px-2 rounded-full border border-border text-b-9">
      {children}
    </Text>
  );
}
