import type { RatingValue } from './general';

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ExtraUserData = UserData & {
  email: string;
  token: string;
};

export type Comment = {
  id: string;
  date: string;
  user: UserData;
  comment: string;
  rating: RatingValue;
};

export type CommentForSending = Pick<Comment, 'comment' | 'rating' | 'id'>;

export type Comments = Comment[];
