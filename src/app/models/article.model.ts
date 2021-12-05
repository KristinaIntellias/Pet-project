export interface Article {
  id: string;
  author: string;
  date: number;
  title: string;
  description: string;
  content?: string;
  favorite: number;
}

export type ArticleWithoutId = Omit<Article, 'id'>
