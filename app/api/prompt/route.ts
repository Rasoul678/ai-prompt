import type { NextRequest } from "next/server";
import { serverService } from "@services";

export const GET = async (req: NextRequest) => {
  try {
    const { posts, error } = await serverService.getAllPosts();

    if (error) {
      return new Response("Failed to fetch all prompts", { status: 500 });
    } else {
      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
