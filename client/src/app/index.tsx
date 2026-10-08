import Motion from '@/components/animations/Motion';
import AboutCard from '@/components/common/about-card';
import AnimatedIntro from '@/components/common/Animated-intro';
import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { clsx } from 'clsx';
import { View } from 'react-native';
import { IOScrollView } from 'react-native-intersection-observer';

export default function HomeScreen() {
  const { resolvedTheme } = useTheme();
  return (
    <IOScrollView>
      <Container>
        <View className='flex-col'>
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
          <Section className='flex-col gap-8' noIcons={{ tl: true, tr: true }}>
            <Section.Header>
              <Section.Tag>MY PERSONAL WORK</Section.Tag>
              <Section.Title title="Personal Projects" />
            </Section.Header>

            <Text variant={"h4"}>
              Server Needed for this section (expected in v0.6.0)
            </Text>
          </Section>
        </View>
        <View className="h-20 mt-5" />
      </Container>
    </IOScrollView>
  );
}
