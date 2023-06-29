"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreatorType } from "@types";

interface IProps {
  params: { id: string };
}

const ProfilePage: React.FC<IProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "";
  const [userPosts, setUserPosts] = useState<PromptWithCreatorType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params.id) {
      fetchPosts();
    }
  }, [params.id]);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default ProfilePage;
