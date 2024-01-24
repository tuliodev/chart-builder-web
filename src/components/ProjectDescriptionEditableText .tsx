import { useState } from "react";

interface EditableTextProps {
  initialText: string;
}

const ProjectDescriptionEditableText: React.FC<EditableTextProps> = ({
  initialText,
}) => {
  const [text, setText] = useState(initialText);

  const handleTextChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setText(e.target.textContent || "");
  };

  return (
    <div
      className="cursor-text border-none outline-none text-[#A0AEC0] font-medium text-xs"
      contentEditable
      onBlur={handleTextChange}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default ProjectDescriptionEditableText;
