import { ContactsSocial } from '@/constants/contacts.constant';
import React, { useEffect, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/Text';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function Contact() {
  const handleClick = async (value: string | undefined) => {
    if(!value) return;
    
    const supported = await Linking.canOpenURL(value);

    if (supported) {
      await Linking.openURL(value);
    }
  };

  return (
    <Animated.View
      layout={LinearTransition.duration(350)}
      className="border-[0.5px] border-border w-full flex-col">
      {ContactsSocial.map(c => (
        <TouchableOpacity
          key={`${c.provider}-${c.account}`}
          className="text-foreground p-3 flex-row gap-3 items-center border-[0.5px] border-border cursor-pointer"
          onPress={() => handleClick(c.redirectUrl)}>
          <Text>
            <c.icon name={c.iconName} size={24} />
          </Text>
          <View className="flex-col">
            <View className="font-semibold text-lg flex-row">
              <Text>{c.provider}</Text>
              {c.type === 'redirect' && (
                <Text className="text-foreground">
                  <MaterialIcons name="arrow-outward" size={14} />
                </Text>
              )}
            </View>
            <Text className="text-grey-70 text-[14px] truncate">
              {c.account}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}
