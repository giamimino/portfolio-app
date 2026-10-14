import { ProjectType } from '@/types';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Image, View } from 'react-native';
import { Text } from './Text';
import Tag from './tag';

const ProjectContext = createContext<ProjectType | null>(null);

function useProjectContext() {
  const ctx = useContext(ProjectContext);

  if (!ctx)
    throw new Error('useProjectContext must be used in Project Component');

  return ctx;
}

function Project({
  data,
  children,
}: PropsWithChildren & { data: ProjectType }) {
  return (
    <ProjectContext.Provider value={data}>
      <View className="border border-border relative min-h-[150px] rounded-lg overflow-hidden">
        {children}
      </View>
    </ProjectContext.Provider>
  );
}

function ProjectHeader({ children }: PropsWithChildren) {
  return <View className="p-2 mt-auto">{children}</View>;
}

function ProjectTitle() {
  const { title } = useProjectContext();
  return <Text className="font-semibold glowing-text">{title}</Text>;
}

function ProjectBackgroundImage() {
  const { thumb } = useProjectContext();

  return (
    <View className="absolute w-full h-full">
      <Image
        source={{
          uri: thumb,
        }}
        resizeMode="cover"
        className="absolute w-full h-full -z-1"
      />
      <View
        className="w-full h-full"
        style={{ boxShadow: `inset 0px 0px 100px 20px #000` }}
      />
    </View>
  );
}

function ProjectTags() {
  const { tags } = useProjectContext();

  return (
    <View className="flex-row gap-2">
      {tags.slice(0, 3).map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      {tags.length > 3 && <Tag>+{tags.length - 3}</Tag>}
    </View>
  );
}

Project.Title = ProjectTitle;
Project.Thumb = ProjectBackgroundImage;
Project.Header = ProjectHeader;
Project.Tags = ProjectTags;

export default Project;
