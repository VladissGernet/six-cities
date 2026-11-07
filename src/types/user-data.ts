import type { RatingValue } from './general';

type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type ExtraUserData = UserData & {
  email: string;
  token: string;
};

type UserComment = {
  id: string;
  date: string;
  user: UserData;
  comment: string;
  rating: RatingValue;
};

type CommentForSending = Pick<UserComment, 'comment' | 'rating' | 'id'>;

type Comments = UserComment[];

export type {
  UserData,
  ExtraUserData,
  UserComment,
  CommentForSending,
  Comments,
};
