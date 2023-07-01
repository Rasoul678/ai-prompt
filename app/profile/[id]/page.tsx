import React from "react";
import { serverService } from "@services";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@utils/react-query/getQueryClient";
import UserProfile from "./UserProfile";
import Hydrate from "@utils/react-query/hydrate.client";

interface IProps {
  params: { id: string };
  searchParams?: Record<string, string | undefined>;
}

const getUserPosts = async (userId: string) => {
  const { posts } = await serverService.getUserPosts(userId);

  return posts;
};

const ProfilePage: React.FC<IProps> = async ({ params, searchParams }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-posts"],
    async () => await getUserPosts(params.id)
  );
  const dehydratedState = dehydrate(queryClient);
  const userName = searchParams?.name as string;

  return (
    <Hydrate state={dehydratedState}>
      <UserProfile params={params} userName={userName} />
    </Hydrate>
  );
};

export default ProfilePage;
