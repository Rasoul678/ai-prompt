import getQueryClient from "@utils/react-query/getQueryClient";
import MyProfile from "./MyProfile";
import { dehydrate } from "@tanstack/react-query";
import { serverService } from "@services";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth/authOptions";
import Hydrate from "@utils/react-query/hydrate.client";
import { PromptWithCreatorType } from "@types";

const getUserPosts = async () => {
  const session = await getServerSession(authOptions);
  let posts: PromptWithCreatorType[] | null = [];

  if (session?.user.id) {
    ({ posts } = await serverService.getUserPosts(session?.user.id));
  }
  return posts ?? [];
};

const ProfilePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-user-posts"], getUserPosts);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MyProfile />
    </Hydrate>
  );
};

export default ProfilePage;
