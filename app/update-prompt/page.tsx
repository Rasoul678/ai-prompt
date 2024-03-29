import { serverService } from "@services";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@utils/react-query/getQueryClient";
import Hydrate from "@utils/react-query/hydrate.client";
import UpdatePrompt from "./UpdatePrompt";

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
