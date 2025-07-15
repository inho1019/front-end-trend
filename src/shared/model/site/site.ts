export type Site = {
  id: string;
  url: string;
  name: string;
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