import React, { PropsWithChildren, useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const animations = {
  'fade-right': {
    from: {
      opacity: 0,
      translateX: -20,
      translateY: 0,
    },
    to: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
    },
  },

  'fade-up': {
    from: {
      opacity: 0,
      translateX: 0,
      translateY: 15,
    },
    to: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
    },
  },

  'fade-down': {
    from: {
      opacity: 0,
      translateX: 0,
      translateY: -15,
    },
    to: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
    },
  },

  'slide-left': {
    from: {
      opacity: 0,
      translateX: 20,
      translateY: 0,
    },
    to: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
    },
  },
  opacity: {
    from: {
      opacity: 0,
      translateX: 0,
      translateY: 0,
    },
    to: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
    },
  },
};

const AnimationTypes = {
  'ease-out': Easing.out(Easing.ease),
  'ease-in': Easing.in(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
  ease: Easing.ease,
};

type Ease = keyof typeof AnimationTypes;

type Present = keyof typeof animations;

const Motion = ({
  children,
  className,
  delay = 0,
  present = 'fade-up',
  duration = 300,
  ease = 'ease',
}: PropsWithChildren & {
  className?: string;
  present?: Present;
  delay?: number;
  duration?: number;
  ease?: Ease;
}) => {
  const config = animations[present];
  const easing = AnimationTypes[ease];
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing,
        reduceMotion: ReduceMotion.System,
      }),
    );
  }, [progress, delay, duration, easing]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 1],
      [config.from.opacity, config.to.opacity],
    ),
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [config.from.translateX, config.to.translateX],
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [config.from.translateY, config.to.translateY],
        ),
      },
    ],
  }));
  return (
    <Animated.View style={animatedStyle} className={className}>
      {children}
    </Animated.View>
  );
};

export default Motion;
