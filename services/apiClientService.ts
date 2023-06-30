import { PromptWithCreatorType } from "@types";

class APIClientSide {
  public getAllPosts = async () => {
    const response = await fetch("/api/prompt");
    const posts = (await response.json()) as PromptWithCreatorType[];
    return posts;
  };

  public getUserPosts = async (userId: string | undefined) => {
    const response = await fetch(`/api/users/${userId}/prompts`);
    const posts = await response.json();
    return posts;
  };
}

export const clientService = new APIClientSide();
