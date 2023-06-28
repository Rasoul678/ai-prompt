"use client";

import { PromptType } from "@types";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  prompt: PromptType;
  handleTagClick: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const PromptCard: React.FC<IProps> = ({ prompt }) => {
  return (
    <div className="prompt_card">
      <div></div>
    </div>
  );
};

export default PromptCard;
