import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const Container = ({ children }: PropsWithChildren) => {
  return <View className="w-full py-3 px-6">{children}</View>;
};

export default Container;
