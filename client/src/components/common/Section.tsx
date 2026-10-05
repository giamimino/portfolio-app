import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { cn } from '@/lib/utils';

export default function Section({
  children,
  noIcons,
  className,
}: PropsWithChildren & {
  noIcons?:
    { tr?: boolean; tl?: boolean; bl?: boolean; br?: boolean } | boolean;
  className?: string;
}) {
  const showIcons = {
    tl: !(typeof noIcons === 'object' ? noIcons.tl : noIcons === true),
    tr: !(typeof noIcons === 'object' ? noIcons.tr : noIcons === true),
    bl: !(typeof noIcons === 'object' ? noIcons.bl : noIcons === true),
    br: !(typeof noIcons === 'object' ? noIcons.br : noIcons === true),
  };

  return (
    <View className={cn(`border border-border relative`, className)}>
      {showIcons.tl && (
        <View className="text-sm z-10 absolute top-[-7.5px] left-[-7.5px] text-n-3">
          <Entypo name="plus" size={18} />
        </View>
      )}
      {showIcons.tr && (
        <View className="text-sm z-10 absolute top-[-7.5px] right-[-7.5px] text-n-3">
          <Entypo name="plus" size={18} />
        </View>
      )}
      {showIcons.bl && (
        <View className="text-sm z-10 absolute bottom-[-7.5px] left-[-7.5px] text-n-3">
          <Entypo name="plus" size={18} />
        </View>
      )}
      {showIcons.br && (
        <View className="text-sm z-10 absolute bottom-[-7.5px] right-[-7.5px] text-n-3">
          <Entypo name="plus" size={18} />
        </View>
      )}
      {children}
    </View>
  );
}
