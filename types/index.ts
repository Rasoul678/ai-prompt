export type PromptType = {
  creator_id: string;
  prompt: string;
  tag: string;
  _id: string;
};

export type UserType = {
  email: string;
  image: string;
  username: string;
  _id: string;
};

export type PromptWithCreatorType = {
  prompt: PromptType;
  creator: UserType | null;
};
