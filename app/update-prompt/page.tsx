import getQueryClient from "@utils/react-query/getQueryClient";
import UpdatePrompt from "./UpdatePrompt";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@utils/react-query/hydrate.client";
import { getServerSession } from "next-auth";
import { serverService } from "@services";
import { PromptWithCreatorType } from "@types";
import { authOptions } from "@utils/auth/authOptions";

interface IProps {
  searchParams?: Record<string, string | undefined>;
}

const getUserPost = async (promptId: string) => {
  const { post } = await serverService.getPostById(promptId);
  return post;
};

const EditPrompt: React.FC<IProps> = async (props) => {
  const { searchParams } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-post"],
    async () => await getUserPost(searchParams?.id as string)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <UpdatePrompt />
    </Hydrate>
  );
};

export default EditPrompt;
