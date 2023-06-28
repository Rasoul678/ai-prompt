import { getCollection, getDocument } from "@utils/firebase/firestore";
import type { NextRequest } from "next/server";
import { PromptWithCreatorType, UserType, PromptType } from "@types";

export const GET = async (req: NextRequest) => {
  try {
    const { error, result: prompts } = await getCollection<PromptType[]>({
      collectionName: "prompts",
    });

    let results: PromptWithCreatorType[] = [];

    const appendUserToPrompt = async (prompt: PromptType) => {
      const docObject: PromptWithCreatorType = { prompt, creator: null };

      const { result } = await getDocument<UserType>({
        collection: "users",
        id: prompt.creator_id,
      });

      docObject.creator = result;

      return docObject;
    };

    const fetchPrompts = prompts?.map(appendUserToPrompt) || [];

    results = await Promise.all(fetchPrompts);

    if (error) {
      return new Response("Failed to fetch all prompts", { status: 500 });
    } else {
      return new Response(JSON.stringify(results), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
