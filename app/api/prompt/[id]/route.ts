import {
  getDocument,
  updateDocument,
  deleteDocument,
} from "@utils/firebase/firestore";
import type { NextRequest } from "next/server";
import { PromptWithCreatorType, UserType, PromptType } from "@types";

//! GET (read)
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const {
      error,
      result: prompt,
      exists,
    } = await getDocument<PromptType>({
      collection: "prompts",
      id: params.id,
    });

    if (!exists) {
      return new Response("Prompt not found!", { status: 404 });
    }

    const { result: user } = await getDocument<UserType>({
      collection: "users",
      id: prompt?.creator_id || "",
    });

    const results: PromptWithCreatorType = {
      prompt,
      creator: user,
    };

    if (error) {
      return new Response("Failed to fetch user's prompt", { status: 500 });
    } else {
      return new Response(JSON.stringify(results), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch user's prompt", { status: 500 });
  }
};

//! PATCH (update)
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    const { error, result } = await updateDocument({
      collection: "prompts",
      id: params.id,
      data: { prompt, tag },
    });

    if (error) {
      return new Response("Failed to update prompt", { status: 500 });
    } else {
      return new Response(JSON.stringify(result), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//! DELETE (delete)
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { error } = await deleteDocument({
      collection: "prompts",
      id: params.id,
    });

    if (error) {
      return new Response("Failed to delete prompt", { status: 500 });
    } else {
      return new Response("Prompt deleted successfully!", { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
