import Container from '@/components/layout/Container';
import Screen from '@/components/layout/Screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/Text';
import { TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnUI } from 'react-native-worklets';

const inputs: { id: string; label: string }[] = [
  { id: 'name', label: 'Name' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'title', label: 'Title' },
];

export default function ContactScreen() {
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressIn = () => {
    runOnUI(() => {
      'worklet';
      scale.value = withTiming(0.95, { duration: 100 });
    })();
  };

  const pressOut = () => {
    runOnUI(() => {
      'worklet';
      scale.value = withTiming(1, { duration: 200 });
    })();
  };

  return (
    <Screen>
      <Container>
        <View className="flex-col gap-2.5">
          {inputs.map(input => (
            <View key={input.id}>
              <Text>{input.label}</Text>
              <TextInput className="text-foreground h-10 border-2 border-border p-1 rounded-md" />
            </View>
          ))}
          <View>
            <Text>Message</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              className="text-foreground h-[120px] border-2 border-border p-3 rounded-md"
            />
          </View>
          <Animated.View style={animatedStyle}>
            <Button
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={() => {
                console.log('Pressed');
              }}
              className="bg-transparent border border-border">
              <Text className="text-foreground">Submit</Text>
            </Button>
          </Animated.View>
        </View>
      </Container>
    </Screen>
  );
}
