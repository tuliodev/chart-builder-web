import ProjectDescriptionEditableText from "./ProjectDescriptionEditableText ";
import ProjectTitleEditableText from "./ProjectTitleEditableText";

export default function SubHeader() {
  return (
    <div className="flex flex-row items-center justify-between p-5 mx-1 border-b border-[#E2E8F0]">
      <div className="flex flex-wrap gap-2 items-center">
        <ProjectTitleEditableText initialText="Untitled" />
        <ProjectDescriptionEditableText initialText="+ Add description..." />
      </div>
      <button className="border border-[#E2E8F0] p-2 rounded-md hover:opacity-75">
        <p className="font-medium text-xs mx-14 hover:opacity-75">
          Projects(2)
        </p>
      </button>
    </div>
  );
}
