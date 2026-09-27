import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { RelativePathString, router } from 'expo-router';

const pages: { title: string; path: RelativePathString }[] = [
  { title: 'Projects', path: '../projects' },
  { title: 'About', path: '../about' },
  { title: 'Contact', path: '../contact' },
];

export default function HomeScreen() {
  const { setTheme } = useTheme();
  const RedirectTo = (path: RelativePathString) => {
    router.push(path);
  };

  return (
    <Card>
      <CardContent>
        <Card>
          <CardContent>
            <Button onPress={() => setTheme('light')}>
              <Text>Light</Text>
            </Button>
            <Button onPress={() => setTheme('dark')}>
              <Text>Dark</Text>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-[10px]">
            {pages.map(page => (
              <Button key={page.title} onPress={() => RedirectTo(page.path)}>
                <Text>{page.title}</Text>
              </Button>
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
