import Motion from '@/components/animations/Motion';
import AnimatedIntro from '@/components/common/Animated-intro';
import Section from '@/components/common/Section';
import Container from '@/components/layout/Container';
import { Text } from '@/components/ui/Text';

export default function HomeScreen() {
  return (
    <Container>
      <Section
        noIcons={{ tr: true, tl: true, bl: true, br: true }}
        className="gap-15 items-center justify-center border-0">
        <AnimatedIntro />
        <Motion duration={800} ease="ease-out" delay={550} className="mt-4">
          <Text className="dark:glowing-text text-xl md:text-2xl text-n-2 text-center">
            A Fullstack Web Developer & ReactNative developer
          </Text>
          <Text className="dark:glowing-text italic text-lg md:text-xl text-n-3 text-center block">
            {`"Writing better code than AI"`}
          </Text>
        </Motion>
      </Section>
    </Container>
  );
}
