import { Like } from "./like.model";

export interface Article {
  _id?: string;
  author: string;
  date: number;
  title: string;
  description: string;
  content?: string;
  userId?: string;
  likeId?: string;
  isOwner: boolean;
  like: Like;
}
