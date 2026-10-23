export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ExtraUserData = UserData & {
  email: string;
  token: string;
};
