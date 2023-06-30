import { PromptType, PromptWithCreatorType, UserType } from "@types";
import {
  getCollection,
  getDocument,
  getDocumentBy,
} from "@utils/firebase/firestore";

class APIServerSide {
  private appendUserToPrompt = async (prompt: PromptType) => {
    const docObject: PromptWithCreatorType = { prompt, creator: null };

    const { result } = await getDocument<UserType>({
      collection: "users",
      id: prompt.creator_id,
    });

    docObject.creator = result;

    return docObject;
  };

  public getAllPosts = async () => {
    const { error, result: prompts } = await getCollection<PromptType[]>({
      collectionName: "prompts",
    });

    const fetchPrompts = prompts?.map(this.appendUserToPrompt) || [];

    const posts = await Promise.all(fetchPrompts);

    return { posts, error };
  };

  public getPostById = async (postId: string) => {
    const {
      error: promptError,
      result: prompt,
      exists,
    } = await getDocument<PromptType>({
      collection: "prompts",
      id: postId,
    });

    let post: PromptWithCreatorType | null = null;
    let error = promptError;

    if (exists) {
      const { error: userError, result: user } = await getDocument<UserType>({
        collection: "users",
        id: prompt?.creator_id || "",
      });

      error = userError;

      post = {
        prompt,
        creator: user,
      };
    }

    return { post, error, exists };
  };

  public getUserPosts = async (userId: string) => {
    const {
      error,
      result: prompts,
      exists,
    } = await getDocumentBy<PromptType[]>({
      collection: "prompts",
      where: "creator_id",
      needle: userId,
    });

    let posts: PromptWithCreatorType[] | null = null;

    if (exists) {
      const { result: user } = await getDocument<UserType>({
        collection: "users",
        id: userId,
      });

      posts =
        prompts?.map((prompt) => ({
          prompt,
          creator: user,
        })) || [];
    }

    return { posts, error };
  };
}

export const serverService = new APIServerSide();
