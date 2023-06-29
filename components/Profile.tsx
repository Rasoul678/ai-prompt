import React from "react";
import PromptCard from "./PromptCard";
import { PromptWithCreatorType } from "@types";

interface IProps {
  name: string;
  description: string;
  data: PromptWithCreatorType[];
  handleEdit?: (prompt: PromptWithCreatorType) => void;
  handleDelete?: (prompt: PromptWithCreatorType) => void;
}

const Profile: React.FC<IProps> = (props) => {
  const { data, description, handleDelete, handleEdit, name } = props;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt) => (
          <PromptCard
            key={prompt.prompt?._id}
            prompt={prompt}
            handleDelete={() => handleDelete?.(prompt)}
            handleEdit={() => handleEdit?.(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
