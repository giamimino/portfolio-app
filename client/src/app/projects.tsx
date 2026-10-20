import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import Project from '@/components/ui/project';
import { Text } from '@/components/ui/Text';
import api from '@/lib/api';
import { Api } from '@/types/api/api';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';

export default function ProjectsScreen() {
  const [projects, setPorjects] = useState<
    Extract<Api.v1.projects.Response, { success: true }>['data'] | null
  >(null);

  useEffect(() => {
    const getProjects = async () => {
      const res = await api.get<Api.v1.projects.Response>('projects', true);

      if (res.success) {
        setPorjects(res.data);
      }
    };

    getProjects();
  }, []);

  return (
    <IOScrollView>
      <Container>
        <Section>
          <Section.Header>
            <Section.Tag>Projects</Section.Tag>
          </Section.Header>

          <View className="flex-col gap-2.5 pt-5">
            {projects ? (
              projects.map(p => (
                <Project data={p} key={p.id}>
                  <Project.Thumb />

                  <Project.Header>
                    <Project.Title />
                    <Project.Tags />
                  </Project.Header>
                </Project>
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </Section>
      </Container>
    </IOScrollView>
  );
}
