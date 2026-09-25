export interface Project {
  project_id: string;
  project_github_url: string;
  preview_url?: string;
  description: string;
  category: string;
  title: string;
  type: string;
  thumb: string;
  tags: string[];
  created_at: Date;
}
