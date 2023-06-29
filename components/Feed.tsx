"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { PromptWithCreatorType } from "@types";

interface IFeedProps {}

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

const Feed: React.FC<IFeedProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] =
    useState<ReturnType<typeof setTimeout>>();
  const [allPosts, setAllPosts] = useState<PromptWithCreatorType[]>([]);
  const [searchResults, setSearchResults] = useState<PromptWithCreatorType[]>(
    []
  );

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter(
      (post) =>
        regex.test(post.prompt?.prompt!) ||
        regex.test(post.prompt?.tag!) ||
        regex.test(post.creator?.username!)
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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

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
      <PromptCardList
        prompts={searchText ? searchResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
