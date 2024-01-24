import { useState } from "react";

interface EditableTextProps {
  initialText: string;
}

const ProjectTitleEditableText: React.FC<EditableTextProps> = ({
  initialText,
}) => {
  const [text, setText] = useState(initialText);

  const handleTextChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setText(e.target.textContent || "");
  };

  return (
    <div
      className="cursor-text border-none outline-none font-semibold text-base"
      contentEditable
      onBlur={handleTextChange}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default ProjectTitleEditableText;
