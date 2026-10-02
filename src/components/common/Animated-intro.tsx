import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../ui/text';

const DURATION = 500;
const DELAY = 200;

export default function AnimatedIntro() {
  const word = 'Hello, I am Gia Miminoshvili.';
  const text = word.split(' ');
  const opacity = text.map(() => useSharedValue(0));
  const translateY = text.map(() => useSharedValue(20));

  useEffect(() => {
    opacity.forEach((value, index) => {
      const animation = withDelay(
        index * DELAY,
        withTiming(1, {
          duration: DURATION,
        }),
      );

      value.value = animation;
    });

    translateY.forEach((value, index) => {
      const animation = withDelay(
        index * DELAY,
        withSpring(0, {
          stiffness: 120,
          damping: 22,
          mass: 4,
          reduceMotion: ReduceMotion.System,
        }),
      );

      value.value = animation;
    });
  }, []);

  return (
    <View className="w-full">
      <View
        className={
          'flex-row flex-wrap gap-1 w-full items-center text-center justify-center'
        }>
        {text.map((item, index) => (
          <Animated.Text
            className={'flex-row'}
            key={item}
            style={{
              opacity: opacity[index],
              transform: [{ translateY: translateY[index] }],
              overflow: 'visible',
            }}>
            <Text className="font-bold text-[40px] text-foreground">
              {item}
            </Text>
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}
