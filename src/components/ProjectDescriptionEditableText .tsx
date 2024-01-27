import { useContext, useEffect, useRef } from "react";

import { DatasourceContext } from "@/contexts/Datasource";

interface EditableTextProps {
  initialText: string;
}

const ProjectDescriptionEditableText: React.FC<EditableTextProps> = ({
  initialText,
}) => {
  const { currentProjectInfo, setProjectInfo } = useContext(DatasourceContext);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents adding a new line
        editableRef.current?.blur(); // Blur to exit contentEditable
      }
    };

    const handleInput = () => {
      const description = editableRef.current?.textContent || "";
      setProjectInfo({
        description,
        title: currentProjectInfo.title,
      });
    };

    editableRef.current?.addEventListener("keydown", handleKeyDown);
    editableRef.current?.addEventListener("input", handleInput);

    return () => {
      editableRef.current?.removeEventListener("keydown", handleKeyDown);
      editableRef.current?.removeEventListener("input", handleInput);
    };
  }, [currentProjectInfo.title, setProjectInfo]);
  return (
    <div
      className="cursor-text border-none outline-none text-[#A0AEC0] font-medium text-xs"
      contentEditable
      ref={editableRef}
      dangerouslySetInnerHTML={{ __html: initialText }}
    />
  );
};

export default ProjectDescriptionEditableText;
