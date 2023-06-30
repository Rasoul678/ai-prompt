"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreatorType } from "@types";
import { clientService } from "@services";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  //! Fetch posts on the client
  const {
    data: allPosts,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["hydrate-user-posts"],
    queryFn: () => clientService.getUserPosts(session?.user.id),
  });

  const handleEdit = ({ prompt }: PromptWithCreatorType) => {
    router.push(`/update-prompt?id=${prompt?._id}`);
  };

  const handleDelete = async ({ prompt }: PromptWithCreatorType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt?._id.toString()}`, {
          method: "DELETE",
        });

        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      description="Welcome to your personalized profile page"
      data={allPosts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
