"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Form, { EditPostType } from "@components/Form";
import { clientService } from "@services";
import { useMutation, useQuery } from "@tanstack/react-query";

interface IProps {}

const UpdatePrompt: React.FC<IProps> = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  //! Fetch post on the client
  const { data: prevPost } = useQuery({
    queryKey: ["hydrate-user-post"],
    queryFn: () => clientService.getUserPost(promptId),
    keepPreviousData: true,
  });

  //! Mutation (edit)
  const { mutate } = useMutation({
    mutationFn: async (promptId: string) => {
      return await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...post,
        }),
      });
    },
    onSuccess: () => {
      setSubmitting(false);
      router.push("/");
    },
  });

  const [post, setPost] = useState<EditPostType>(prevPost?.prompt);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (promptId) {
      mutate(promptId);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
