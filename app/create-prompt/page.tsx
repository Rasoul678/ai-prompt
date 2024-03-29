"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form, { EditPostType } from "@components/Form";

interface IProps {}

const CreatePrompt: React.FC<IProps> = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<EditPostType>({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
