import React from "react";
import PromptCard from "./PromptCard";
import { PromptWithCreatorType } from "@types";

interface IProps {
  name: string;
  description: string;
  data: PromptWithCreatorType[];
  isLoading?: boolean;
  error?: any;

  handleEdit?: (prompt: PromptWithCreatorType) => void;
  handleDelete?: (prompt: PromptWithCreatorType) => void;
}

const Profile: React.FC<IProps> = (props) => {
  const {
    data,
    description,
    handleDelete,
    handleEdit,
    name,
    error,
    isLoading,
  } = props;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-10 prompt_layout">
        {error ? (
          <p>Oh no, there was an error</p>
        ) : isLoading ? (
          <p>Loading profile...</p>
        ) : data ? (
          <>
            {data.map((prompt) => (
              <PromptCard
                key={prompt.prompt?._id}
                prompt={prompt}
                handleDelete={() => handleDelete?.(prompt)}
                handleEdit={() => handleEdit?.(prompt)}
              />
            ))}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Profile;
