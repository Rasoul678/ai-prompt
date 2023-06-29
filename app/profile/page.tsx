"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreatorType } from "@types";

interface IProps {}

const ProfilePage: React.FC<IProps> = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PromptWithCreatorType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

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

        const filteredPosts = posts.filter(
          (p) => p.prompt?._id !== prompt?._id
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ProfilePage;
