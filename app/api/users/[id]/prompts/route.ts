import { serverService } from "@services";
import type { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { error, posts } = await serverService.getUserPosts(params.id);

    if (error) {
      return new Response("Failed to fetch user's prompts", { status: 500 });
    } else {
      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch user's prompts", { status: 500 });
  }
};
