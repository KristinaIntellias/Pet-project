export interface Article {
  author: string;
  date: number | Date;
  title: string;
  description: string;
  content?: string;
  favorite: number;
}
