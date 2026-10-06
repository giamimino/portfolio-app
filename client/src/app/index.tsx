import Motion from '@/components/animations/Motion';
import AnimatedIntro from '@/components/common/Animated-intro';
import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { clsx } from 'clsx';
import { IOScrollView } from 'react-native-intersection-observer';

export default function HomeScreen() {
  const { resolvedTheme } = useTheme();
  return (
    <Container>
      <IOScrollView>
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
        <Section className="p-3 mt-16">
          <Section.Header>
            <Motion duration={800} ease="ease-out" delay={150}>
              <Section.Tag>WHAT DO I DO</Section.Tag>
            </Motion>
            <Section.Title title="I Know How To Make A Good Web Application"></Section.Title>
          </Section.Header>
        </Section>
      </IOScrollView>

      {/* <Button
        onPress={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
        <Text>Toggle THeme</Text>
      </Button> */}
    </Container>
  );
}
