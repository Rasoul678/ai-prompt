import Feed from "@components/Feed";
import { serverService } from "@services";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "@utils/react-query/getQueryClient";
import Hydrate from "@utils/react-query/hydrate.client";

const getAllPosts = async () => {
  const { posts } = await serverService.getAllPosts();
  return posts;
};

const Home = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-posts"], getAllPosts);
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        This is an open-source AI prompting tool for modern world to discover,
        create and share creative prompts
      </p>
      <Hydrate state={dehydratedState}>
        <Feed />
      </Hydrate>
    </section>
  );
};

export default Home;
