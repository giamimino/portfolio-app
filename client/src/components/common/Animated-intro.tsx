import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  ReduceMotion,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../ui/Text';

const DURATION = 500;
const DELAY = 200;

type WordProps = {
  word: string;
  index: number;
  progress: SharedValue<number>;
};

function Word({ word, index, progress }: WordProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const delay = index * DELAY;

    return {
      opacity: withDelay(
        delay,
        withTiming(progress.value, {
          duration: DURATION,
        }),
      ),

      transform: [
        {
          translateY: withDelay(
            delay,
            withSpring(20 * (1 - progress.value), {
              stiffness: 120,
              damping: 22,
              mass: 4,
              reduceMotion: ReduceMotion.System,
            }),
          ),
        },
      ],
    };
  });

  return (
    <Animated.Text
      className="flex-row"
      style={[
        animatedStyle,
        {
          overflow: 'visible',
        },
      ]}>
      <Text className="font-bold text-[40px] text-foreground glowing-text">
        {word}
      </Text>
    </Animated.Text>
  );
}

export default function AnimatedIntro() {
  const word = 'Hello, I am Gia Miminoshvili.';
  const text = word.split(' ');
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: DURATION,
      reduceMotion: ReduceMotion.System,
    });
  }, [progress]);

  return (
    <View className="w-full">
      <View
        className={
          'flex-row flex-wrap gap-1 w-full items-center text-center justify-center'
        }>
        {text.map((item, index) => (
          <Word key={`${item}`} word={item} index={index} progress={progress} />
        ))}
      </View>
    </View>
  );
}
