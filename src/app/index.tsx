import { RelativePathString, router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const pages: { title: string; path: RelativePathString }[] = [
  { title: 'Projects', path: '../projects' },
  { title: 'About', path: '../about' },
  { title: 'Contact', path: '../contact' },
];

export default function HomeScreen() {
  const RedirectTo = (path: RelativePathString) => {
    router.push(path);
  };

  return (
    <View>
      <View className="m-2 p-6 border border-red-600 rounded-xl gap-2.5">
        {pages.map(page => (
          <Button
            key={page.title}
            title={page.title}
            onPress={() => RedirectTo(page.path)}
          />
        ))}
      </View>
    </View>
  );
}
