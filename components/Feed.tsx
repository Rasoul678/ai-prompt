"use client";

import React, { useState } from "react";
import PromptCard from "./PromptCard";
import { PromptWithCreatorType } from "@types";
import { useQuery } from "@tanstack/react-query";
import { clientService } from "@services";

interface ICardListProps {
  prompts: PromptWithCreatorType[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<ICardListProps> = ({
  prompts,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.prompt?._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] =
    useState<ReturnType<typeof setTimeout>>();
  const [searchResults, setSearchResults] = useState<PromptWithCreatorType[]>(
    []
  );

  //! Fetch the posts on the client
  const {
    data: allPosts,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["hydrate-posts"],
    queryFn: () => clientService.getAllPosts(),
  });

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");

    return (
      allPosts?.filter(
        (post) =>
          regex.test(post.prompt?.prompt!) ||
          regex.test(post.prompt?.tag!) ||
          regex.test(post.creator?.username!)
      ) || []
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    clearTimeout(searchTimeout);
    setSearchText(searchText);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(searchText);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResults = filterPosts(tagName);
    setSearchResults(searchResults);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : allPosts ? (
        <PromptCardList
          prompts={searchText ? searchResults : allPosts}
          handleTagClick={handleTagClick}
        />
      ) : null}
    </section>
  );
};

export default Feed;
