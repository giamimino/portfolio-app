import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView className="flex-1 bg-background">{children}</SafeAreaView>
  );
};

export default Screen;
