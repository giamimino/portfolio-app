export type ProjectType = {
  id: string;
  description: string;
  tags: string[];
  type: string;
  created_at: Timestamp;
  title: string;
  project_github_url: string;
  category: string;
  project_id: string;
  thum: string;
};

export type ExpPanelAboutType = {
  description: string;
  level: string;
  title: string;
  id: string;
};
