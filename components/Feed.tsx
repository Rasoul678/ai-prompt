"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { PromptWithCreatorType } from "@types";

interface IFeedProps {}

interface ICardListProps {
  prompts: PromptWithCreatorType[];
  handleTagClick: () => void;
}

const PromptCardList: React.FC<ICardListProps> = ({
  prompts,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

const Feed: React.FC<IFeedProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
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
      <PromptCardList prompts={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
