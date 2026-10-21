import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/Text';
import api from '@/lib/api';
import { Api } from '@/types/api/api';
import { useRef } from 'react';
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
  const scale = useSharedValue(1);
  const values = useRef<Record<string, string>>({});

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

  const handleSubmit = async () => {
    const { name, phone, email, title, message } = values.current;

    if (!name || !phone || !email || !title || !message) {
      return;
    }

    const template = `
        <div style="margin:0; padding:0; background:#f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; font-family: Arial, sans-serif;">
                  
                  <tr>
                    <td style="padding:20px; text-align:center; background:#111; color:#ffffff;">
                      <h1 style="margin:0; font-size:24px;">Portfolio v3</h1>
                    </td>

                  <tr>
                    <td style="padding:30px; color:#333333; font-size:16px; line-height:1.5;">
                      <p style="margin-top:0;">Hi Gia,</p>

                      <p>
                        You have new message from ${name}
                      </p>
              
                      <div>
                      <h1>${title}</h1>
                      <p>
                        ${message}
                      </p>
                      </div>

                      <div style="width: 100%; height: 1px; background-color: #2563eb;"></div>
                      <p style="margin: 10px 0 0 0;">phone: ${phone}</p>
                      <p style="margin: 0;">email: ${email}</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px; text-align:center; font-size:12px; color:#999;">
                      © 2026 portfolio v3<br />
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </div>
    `;

    const res = await api.post<Api.v1.contact.Response, Api.v1.contact.Request>(
      '/contact',
      { template },
    );

    if (res.success) {
      alert(res.data.message);
    }
  };

  return (
    <Container>
      <View className="flex-col gap-2.5">
        {inputs.map(input => (
          <View key={input.id}>
            <Text>{input.label}</Text>
            <TextInput
              onChangeText={t => (values.current[input.id] = t)}
              className="text-foreground h-10 border-2 border-border p-1 rounded-md"
            />
          </View>
        ))}
        <View>
          <Text>Message</Text>
          <TextInput
            multiline
            onChangeText={t => (values.current.message = t)}
            textAlignVertical="top"
            className="text-foreground h-[120px] border-2 border-border p-3 rounded-md"
          />
        </View>
        <Animated.View style={animatedStyle}>
          <Button
            onPressIn={pressIn}
            onPressOut={pressOut}
            onPress={handleSubmit}
            className="bg-transparent border border-border">
            <Text className="text-foreground">Submit</Text>
          </Button>
        </Animated.View>
      </View>
    </Container>
  );
}
