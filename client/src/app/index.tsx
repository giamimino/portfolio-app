import Motion from '@/components/animations/Motion';
import AboutCard from '@/components/common/about-card';
import AnimatedIntro from '@/components/common/Animated-intro';
import Contact from '@/components/common/Contacts';
import ExpandablePanel from '@/components/common/expandable-panel';
import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { ExpPanelAboutType, ProjectType } from '@/types';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';

const endpoint = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/landing-page`;

export default function HomeScreen() {
  const [data, setData] = useState<any | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setData(data.data);
        }
      });
  }, []);

  return (
    <IOScrollView>
      <Container>
        <View className="flex-col">
          <Section
            noIcons={{ tr: true, tl: true, bl: true, br: true }}
            className="gap-15 items-center justify-center border-0">
            <AnimatedIntro />
            <Motion duration={800} ease="ease-out" delay={550} className="mt-4">
              <Text
                className={clsx(
                  'text-xl md:text-2xl text-n-2 text-center',
                  resolvedTheme === 'dark' && 'glowing-text',
                )}>
                A Fullstack Web Developer & ReactNative developer
              </Text>
              <Text
                className={clsx(
                  'italic text-lg md:text-xl text-n-3 text-center block',
                  resolvedTheme === 'dark' && 'glowing-text',
                )}>
                {`"Writing better code than AI"`}
              </Text>
            </Motion>
          </Section>
          <Section className="mt-8 flex-col gap-8">
            <Section.Header>
              <Motion duration={800} ease="ease-out" delay={150}>
                <Section.Tag>WHAT DO I DO</Section.Tag>
              </Motion>
              <Section.Title title="I Know How To Make A Good Web Application"></Section.Title>
            </Section.Header>
            <AboutCard
              title="Full-Stack Developer"
              context="I build fast, accessible websites"
              skills={[
                'Modren React/Next.js Frontends',
                'Auth & databases (Neon, Prisma, JWT, Next Auth)',
                'Performance, clean code, fast learner',
              ]}
              tags={['React', 'Next.js', 'Prisma']}
            />
          </Section>
          <Section className="flex-col gap-8" noIcons={{ tl: true, tr: true }}>
            <Section.Header>
              <Section.Tag>MY PERSONAL WORK</Section.Tag>
              <Section.Title title="Personal Projects" />
            </Section.Header>

            <Text variant={'h4'}>
              Server Needed for this section (expected in v0.6.0)
            </Text>
          </Section>
          <Section className="flex-col gap-8" noIcons={{ tl: true, tr: true }}>
            <Section.Header>
              <Section.Tag>ABOUT</Section.Tag>
              <Section.Title title="Who am I?" />
              <Section.Description>
                I learn fast and work productively, focusing on constant
                improvement rather than wasting time.
              </Section.Description>
            </Section.Header>

            <View className="flex-col">
              {data &&
                data.about.success &&
                data.about.data
                  .sort(
                    (a: ExpPanelAboutType, b: ExpPanelAboutType) =>
                      Number(a.level) - Number(b.level),
                  )
                  .map((item: ExpPanelAboutType) => (
                    <ExpandablePanel key={item.id}>
                      <ExpandablePanel.Header>
                        {item.title}
                      </ExpandablePanel.Header>
                      <ExpandablePanel.Content content={item.description} />
                    </ExpandablePanel>
                  ))}
            </View>
            <View className="pt-8">
              <Contact />
            </View>
          </Section>
        </View>
        <View className="h-20 mt-5" />
      </Container>
    </IOScrollView>
  );
}
