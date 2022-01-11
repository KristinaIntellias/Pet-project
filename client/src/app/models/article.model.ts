import { User } from "./user.model";

export interface Article {
  _id?: string;
  author: User;
  date: number;
  title: string;
  description: string;
  content?: string;
  usersLikeId: Array<string>;
  tags?: Array<string>;
  isOwner: boolean;
}
