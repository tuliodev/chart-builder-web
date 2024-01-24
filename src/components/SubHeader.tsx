import ProjectDescriptionEditableText from "./ProjectDescriptionEditableText ";
import ProjectsMenu from "./ProjectsMenu";
import ProjectTitleEditableText from "./ProjectTitleEditableText";

export default function SubHeader() {
  return (
    <div className="flex flex-row items-center justify-between p-4 mx-1 border-b border-[#E2E8F0]">
      <div className="flex flex-wrap gap-2 items-center">
        <ProjectTitleEditableText initialText="Untitled" />
        <ProjectDescriptionEditableText initialText="+ Add description..." />
      </div>
      <div className="mx-14">
        {" "}
        <ProjectsMenu />
      </div>
    </div>
  );
}
