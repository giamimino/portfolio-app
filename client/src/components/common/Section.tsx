import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { cn } from '@/lib/utils';
import { Text } from '../ui/Text';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { InView } from 'react-native-intersection-observer';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '@/providers/ThemeProvider';
import { THEME } from '@/lib/theme';

function Section({
  children,
  noIcons,
  className,
}: PropsWithChildren & {
  noIcons?:
    { tr?: boolean; tl?: boolean; bl?: boolean; br?: boolean } | boolean;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const showIcons = {
    tl: !(typeof noIcons === 'object' ? noIcons.tl : noIcons === true),
    tr: !(typeof noIcons === 'object' ? noIcons.tr : noIcons === true),
    bl: !(typeof noIcons === 'object' ? noIcons.bl : noIcons === true),
    br: !(typeof noIcons === 'object' ? noIcons.br : noIcons === true),
  };

  const n3 = THEME[resolvedTheme].n3;

  return (
    <View className={cn(`border border-border relative`, className)}>
      {showIcons.tl && (
        <View className="text-sm z-10 absolute top-[-8.5px] left-[-8.5px] text-n-3">
          <Entypo name="plus" size={18} color={n3} />
        </View>
      )}
      {showIcons.tr && (
        <View className="text-sm z-10 absolute top-[-8.5px] right-[-8.5px] text-n-3">
          <Entypo name="plus" size={18} color={n3} />
        </View>
      )}
      {showIcons.bl && (
        <View className="text-sm z-10 absolute bottom-[-8.5px] left-[-8.5px] text-n-3">
          <Entypo name="plus" size={18} color={n3} />
        </View>
      )}
      {showIcons.br && (
        <View className="text-sm z-10 absolute bottom-[-8.5px] right-[-8.5px] text-n-3">
          <Entypo name="plus" size={18} color={n3} />
        </View>
      )}
      {children}
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,

    transform: [
      {
        perspective: 800,
      },
      {
        translateX: interpolate(progress.value, [0, 1], [10, 0]),
      },
      {
        translateY: interpolate(progress.value, [0, 1], [51, 0]),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [60, 0])}deg`,
      },
      {
        rotateX: `${interpolate(progress.value, [0, 1], [-40, 0])}deg`,
      },
    ],
  }));

  return (
    <InView
      threshold={0.25}
      onChange={inView => {
        if (inView && progress.value === 0) {
          progress.set(
            withTiming(1, {
              duration: 700,
            }),
          );
        }
      }}>
      <Animated.View style={animatedStyle}>
        <Text
          className={`text-foreground font-extrabold text-xl text-center glowing-text`}>
          {title}
        </Text>
      </Animated.View>
    </InView>
  );
}

function SectionTag({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();

  const foreground = THEME[resolvedTheme].default;
  return (
    <MaskedView
      maskElement={
        <Text className="text-sm text-foreground font-medium uppercase">
          [{children}]
        </Text>
      }>
      <LinearGradient
        colors={['#d1d5db', '#ddd', foreground]}
        locations={[0, 0.05, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <Text className="text-sm font-medium uppercase opacity-0 text-foreground">
          [{children}]
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

function SectionHeader({ children }: PropsWithChildren) {
  return <View className="flex-col gap-2.5 items-center">{children}</View>;
}

Section.Title = SectionTitle;
Section.Tag = SectionTag;
Section.Header = SectionHeader;

export default Section;
