"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreatorType } from "@types";
import { clientService } from "@services";
import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@utils/react-query/getQueryClient";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = getQueryClient();

  //! Fetch posts on the client
  const {
    data: allPosts,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["hydrate-user-posts"],
    queryFn: () => clientService.getUserPosts(session?.user.id),
    keepPreviousData: true,
  });

  //! Mutation (delete)
  const { mutate } = useMutation({
    mutationFn: async (promptId: string) => {
      return await fetch(`/api/prompt/${promptId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hydrate-user-posts"] });
    },
  });

  const handleEdit = ({ prompt }: PromptWithCreatorType) => {
    router.push(`/update-prompt?id=${prompt?._id}`);
  };

  const handleDelete = async ({ prompt }: PromptWithCreatorType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    const promptId = String(prompt?._id);

    if (hasConfirmed) {
      mutate(promptId);
    }
  };

  return (
    <Profile
      name="My"
      isLoading={isLoading}
      error={error}
      description="Welcome to your personalized profile page"
      data={allPosts || []}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
