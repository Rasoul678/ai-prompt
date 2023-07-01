"use client";

import Profile from "@components/Profile";
import { clientService } from "@services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  params: { id: string };
  userName: string;
}

const UserProfile: React.FC<IProps> = ({ params, userName }) => {
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name") || userName;

  //! Fetch posts on the client
  const {
    data: userPosts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hydrate-user-posts"],
    queryFn: () => clientService.getUserPosts(params.id),
    keepPreviousData: true,
  });

  return (
    <Profile
      name={profileName}
      isLoading={isLoading}
      error={error}
      description={`Welcome to ${profileName}'s personalized profile page. Explore ${profileName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts || []}
    />
  );
};

export default UserProfile;
