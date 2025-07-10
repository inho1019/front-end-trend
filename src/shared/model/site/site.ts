export type Site = {
  id: string;
  url: string;
  name: string;
  description?: string;
  type: {
    title: string;
    content: string;
    link?: string;
    owner?: string;
    thumbnail?: string;
  };
};