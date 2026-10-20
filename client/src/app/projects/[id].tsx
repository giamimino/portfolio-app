import Container from '@/components/layout/Container';
import Tag from '@/components/ui/tag';
import api from '@/lib/api';
import { THEME } from '@/lib/theme';
import { useTheme } from '@/providers/ThemeProvider';
import { Api } from '@/types/api/api';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';
import { BlurView } from 'expo-blur';
import { Button } from '@/components/ui/button';
import Motion from '@/components/animations/Motion';

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [project, setProject] = useState<
    Extract<Api.v1.projects.project.Response, { success: true }>['data'] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const navigation = useNavigation();

  const handleClick = async (value: string | undefined) => {
    if (!value) return;

    const supported = await Linking.canOpenURL(value);

    if (supported) {
      await Linking.openURL(value);
    }
  };

  useEffect(() => {
    const getProject = async (projectId: string) => {
      setLoading(true);
      const res = await api.get<Api.v1.projects.project.Response>(
        `projects/${projectId}`,
        false,
      );

      if (res.success) {
        setProject(res.data);
        navigation.setOptions({ title: res.data.title });
      }

      setLoading(false);
    };

    getProject(id);
  }, [id]);

  const shadowClr = THEME[resolvedTheme].border;

  return (
    <IOScrollView>
      <Container>
        {loading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        {project ? (
          <View>
            <Motion duration={800} ease="ease-out" delay={400}>
              <View
                className="relative w-full h-[200px] rounded-md p-2 border border-border flex justify-center items-center"
                style={{ boxShadow: `0px 0px 20px ${shadowClr}` }}>
                <View className="absolute w-full h-full rounded-md overflow-hidden">
                  <Image
                    source={{
                      uri: project.thumb,
                    }}
                    resizeMode="cover"
                    className="absolute w-full h-full"
                  />
                  <View
                    className="w-full h-full"
                    style={{ boxShadow: `inset 0px 0px 50px 10px #000` }}
                  />
                </View>
                <View className="absolute -top-6">
                  <View className="overflow-hidden rounded-xl">
                    <Tag className="bg-background text-foreground border border-border">
                      {project.category}
                    </Tag>
                  </View>
                </View>
              </View>
            </Motion>
            <View className="py-4 flex-col gap-2.5">
              <Motion duration={800} ease="ease-out" delay={550}>
                <Text className="text-foreground glowing-text opacity-40 text-sm tracking-tighter">
                  {project.description}
                </Text>
              </Motion>
              <Motion duration={800} ease="ease-out" delay={700}>
                <View className="flex-row gap-2.5 flex-wrap">
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </View>
              </Motion>
              <Motion duration={800} ease="ease-out" delay={850}>
                <View className="flex-row gap-2.5">
                  <Button
                    className="bg-foreground"
                    onPress={() => handleClick(project.project_github_url)}>
                    <Text className="text-background">Source Code</Text>
                  </Button>
                  <Button
                    variant={'outline'}
                    onPress={() => handleClick(project.preview_url)}>
                    <Text className="text-foreground">{'Preview'}</Text>
                  </Button>
                </View>
              </Motion>
            </View>
          </View>
        ) : (
          <View>
            <Text className="text-foreground">
              Sorry! Project cant be found.
            </Text>
          </View>
        )}
      </Container>
    </IOScrollView>
  );
}
