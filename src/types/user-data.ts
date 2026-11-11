import type { AuthenticationStatus } from '../const';
import type { RatingValue } from './general';
import type { ErrorMessage } from './state';

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

type UserStateType = {
  authErrorMessage: ErrorMessage;
  authenticationStatus: AuthenticationStatus;
  userAccountData: ExtraUserData | null;
};

export type {
  UserData,
  ExtraUserData,
  UserComment,
  CommentForSending,
  Comments,
  UserStateType,
};
