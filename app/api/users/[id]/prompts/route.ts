import { getDocument, getDocumentBy } from "@utils/firebase/firestore";
import type { NextRequest } from "next/server";
import { PromptWithCreatorType, UserType, PromptType } from "@types";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { error, result: prompts } = await getDocumentBy<PromptType[]>({
      collection: "prompts",
      where: "creator_id",
      needle: params.id,
    });

    const { result: user } = await getDocument<UserType>({
      collection: "users",
      id: params.id,
    });

    const results: PromptWithCreatorType[] =
      prompts?.map((prompt) => ({
        prompt,
        creator: user,
      })) || [];

    if (error) {
      return new Response("Failed to fetch user's prompts", { status: 500 });
    } else {
      return new Response(JSON.stringify(results), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch user's prompts", { status: 500 });
  }
};
