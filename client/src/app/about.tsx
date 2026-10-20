import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import { Text } from '@/components/ui/Text';
import api from '@/lib/api';
import { Api } from '@/types/api/api';
import { TextConvert } from '@/utils/TextConvert';
import Entypo from '@expo/vector-icons/Entypo';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';

export default function AboutScreen() {
  const [about, setAbout] = useState<
    Extract<Api.v1.about.Response, { success: true }>['data'] | null
  >(null);

  useEffect(() => {
    const getAboutData = async () => {
      const res = await api.get<Api.v1.about.Response>('about', true);

      if (res.success) {
        setAbout(
          res.data.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds),
        );
      }
    };

    getAboutData();
  }, []);

  return (
    <IOScrollView>
      <Container>
        <Section>
          <Section.Header>
            <Section.Tag>About</Section.Tag>
          </Section.Header>
          {about ? (
            about
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((data, i) => (
                <View
                  key={data.id}
                  className={clsx(
                    'py-5 flex-col gap-2.5',
                    i !== 0 ? 'border-t border-border' : '',
                  )}>
                  <Section.Title title={data.title} className="text-left" />
                  <View className="flex-col gap-2">
                    {TextConvert(data.text).map(item => (
                      <View key={item.text} className="flex-row">
                        {item.type === 'bullets' && (
                          <Text className="text-foreground/70">
                            <Entypo name="dot-single" />
                          </Text>
                        )}
                        <Text className="text-foreground/70">{item.text}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
          ) : (
            <Text>Loading...</Text>
          )}
        </Section>

        <View className="h-20" />
      </Container>
    </IOScrollView>
  );
}
