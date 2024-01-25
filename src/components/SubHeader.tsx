import ProjectDescriptionEditableText from "./ProjectDescriptionEditableText ";
import ProjectTitleEditableText from "./ProjectTitleEditableText";

export default function SubHeader() {
  return (
    <div className="flex flex-row items-center justify-between p-4 mx-1 border-b border-[#E2E8F0]">
      <div className="flex flex-wrap gap-4 items-center">
        <ProjectTitleEditableText initialText="Untitled" />
        <ProjectDescriptionEditableText initialText="+ Add description..." />
      </div>
    </div>
  );
}
