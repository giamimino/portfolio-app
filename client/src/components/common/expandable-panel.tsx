import { ExpPanelAboutType } from '@/types';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui/Text';
import Entypo from '@expo/vector-icons/Entypo';
import Animated, {
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ExpandablePanelContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function ExpandablePanelProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const value = { open, setOpen };

  return (
    <ExpandablePanelContext.Provider value={value}>
      {children}
    </ExpandablePanelContext.Provider>
  );
}

function useExpandablePanel() {
  const ctx = useContext(ExpandablePanelContext);
  if (!ctx) throw new Error('out of context');
  return ctx;
}

function ExpandablePanel({ children }: PropsWithChildren) {
  return (
    <ExpandablePanelProvider>
      <Animated.View
        layout={LinearTransition.duration(350)}
        className="flex-col gap-2.5">
        {children}
      </Animated.View>
    </ExpandablePanelProvider>
  );
}

function ExpandablePanelHeader({ children }: PropsWithChildren) {
  const { open, setOpen } = useExpandablePanel();
  const progress = useSharedValue(open ? 0 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg`,
      },
    ],
  }));

  useEffect(() => {
    progress.set(
      withTiming(open ? 1 : 0, {
        duration: 400,
      }),
    );
  }, [open]);

  return (
    <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
      <View className="flex-row justify-between items-center">
        <Text className="text-lg glowing-text font-semibold">{children}</Text>
        <Animated.View style={animatedStyle}>
          <Text className="text-foreground">
            <Entypo name="plus" size={24} />
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

function ExpandablePanelContent({ content }: { content: string }) {
  const { open } = useExpandablePanel();
  const opacity = useSharedValue(open ? 0 : 1);

  useEffect(() => {
    opacity.set(
      withTiming(open ? 1 : 0, {
        duration: 700,
      }),
    );
  }, [open]);

  return (
    <View className="p-1">
      {open && (
        <Animated.View style={{ opacity }} className="text-foreground/70">
          {Array.isArray(content) ? (
            <View className="flex-col justify-start items-start">
              {content.map((p, i) => (
                <View className='flex-row' key={p}>
                  <Text className='text-foreground'>
                    <Entypo name="dot-single" size={24} />
                  </Text>
                  <Text>
                    {p}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>{content}</Text>
          )}
        </Animated.View>
      )}
    </View>
  );
}

ExpandablePanel.Header = ExpandablePanelHeader;
ExpandablePanel.Content = ExpandablePanelContent;

export default ExpandablePanel;
