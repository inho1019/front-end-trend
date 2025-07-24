export type Site = {
  id: string;
  url: string;
  name: string;
  link?: string;
  description?: string;
  type: {
    title: string;
    content: string;
    createdAt: string;
    link?: string;
    author?: string;
    thumbnail?: string;
  };
};