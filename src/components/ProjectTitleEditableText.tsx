import React, { useContext, useEffect, useRef } from "react";

import { DatasourceContext } from "@/contexts/Datasource";

interface EditableTextProps {
  initialText: string;
}

const ProjectTitleEditableText: React.FC<EditableTextProps> = ({
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
      const title = editableRef.current?.textContent || "";
      setProjectInfo({
        description: currentProjectInfo.description,
        title,
      });
    };

    editableRef.current?.addEventListener("keydown", handleKeyDown);
    editableRef.current?.addEventListener("input", handleInput);

    return () => {
      editableRef.current?.removeEventListener("keydown", handleKeyDown);
      editableRef.current?.removeEventListener("input", handleInput);
    };
  }, [currentProjectInfo.description, setProjectInfo]);

  return (
    <div
      ref={editableRef}
      className="cursor-text border-none outline-none font-semibold text-base"
      contentEditable
      dangerouslySetInnerHTML={{ __html: initialText }}
    />
  );
};

export default ProjectTitleEditableText;
