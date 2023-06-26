import { addDocument } from "@utils/firebase/firestore";
import type { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();

  try {
    const newPrompt = {
      creator: userId,
      prompt,
      tag,
    };

    const { error } = await addDocument({
      colllection: "prompts",
      data: newPrompt,
    });

    if (error) {
      return new Response("Failed to create a new prompt", { status: 500 });
    } else {
      return new Response(JSON.stringify(newPrompt), { status: 201 });
    }
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
