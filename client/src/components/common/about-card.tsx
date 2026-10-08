import Tag from "../ui/tag";
import { View } from "react-native";
import { Text } from "../ui/Text";
import Feather from '@expo/vector-icons/Feather';

export default function AboutCard({
  title,
  context,
  skills,
  tags,
}: {
  title: string;
  context: string;
  skills: string[];
  tags: string[];
}) {

  return (
    <View
      className="border-[2px] border-border flex-col gap-5 p-3.5"
    >
      <View className="flex-col gap-1">
        <Text className="text-foreground text-2xl font-light text-center">{title}</Text>
        <Text className="text-foreground/60 text-center">{context}</Text>
      </View>
      <View className="w-full h-[0.5px] border border-border"></View>
      <View className="flex-col gap-2.5">
        {skills.map((skill) => (
          <View key={skill} className="flex-row gap-2.5 items-center">
            <View className="w-8 h-8 rounded-full bg-dark-02/70 border border-dark-03 items-center justify-center">
              <Text className="text-foreground">
                <Feather name="check" size={20} className="" />
              </Text>
            </View>
            <Text className="flex-1 text-foreground/75">{skill}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2.5">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </View>
    </View>
  );
}