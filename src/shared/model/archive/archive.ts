export type Archive = {
  title: string;
  content: string;
  createdAt: string;
  language?: string;
  link?: string;
};

export type ArchiveResponse = {
  name: string;
  path: string;
};