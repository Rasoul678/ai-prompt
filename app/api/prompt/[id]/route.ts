import {
  getDocument,
  updateDocument,
  deleteDocument,
} from "@utils/firebase/firestore";
import type { NextRequest } from "next/server";
import { PromptWithCreatorType, UserType, PromptType } from "@types";
import { serverService } from "@services";

//! GET (read)
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { error, exists, post } = await serverService.getPostById(params.id);

    if (!exists) {
      return new Response("Prompt not found!", { status: 404 });
    }

    if (error) {
      return new Response("Failed to fetch user's prompt", { status: 500 });
    } else {
      return new Response(JSON.stringify(post), { status: 200 });
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
