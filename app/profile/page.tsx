"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreatorType } from "@types";

interface IProps {}

const ProfilePage: React.FC<IProps> = (props) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PromptWithCreatorType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/prompts`
      );
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  const handleEdit = () => {};
  const handleDelete = async () => {};
  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleDelete={handleEdit}
      handleEdit={handleDelete}
    />
  );
};

export default ProfilePage;
