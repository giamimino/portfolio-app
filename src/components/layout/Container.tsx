import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <View className="flex-1 w-full bg-background py-8 px-6">{children}</View>
  );
};

export default Container;
