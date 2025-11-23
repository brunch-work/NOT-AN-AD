import { IconPartnership } from "./Icons/Partnership";
import { IconStrategy } from "./Icons/Strategy";
import { IconContentCreation } from "./Icons/ContentCreation";
import { IconAmplification } from "./Icons/Amplification";
import { IconEarnedMedia } from "./Icons/EarnedMedia";

export const ProjectType = ({ type }) => {
  console.info(type);

  if (!type) return null;

  if (type === "partnership") {
    return (
      <div className="project-type">
        <span className="project-type-icon">
          <IconPartnership />
        </span>
        <span className="project-type-text">Partnership</span>
      </div>
    );
  }

  if (type === "strategy") {
    return (
      <div className="project-type">
        <span className="project-type-icon">
          <IconStrategy />
        </span>
        <span className="project-type-text">Strategy</span>
      </div>
    );
  }

  if (type === "content-creation") {
    return (
      <div className="project-type">
        <span className="project-type-icon">
          <IconContentCreation />
        </span>
        <span className="project-type-text">Content Creation</span>
      </div>
    );
  }

  if (type === "amplification") {
    return (
      <div className="project-type">
        <span className="project-type-icon">
          <IconAmplification />
        </span>
        <span className="project-type-text">Amplification</span>
      </div>
    );
  }

  if (type === "earned-media") {
    return (
      <div className="project-type">
        <span className="project-type-icon">
          <IconEarnedMedia />
        </span>
        <span className="project-type-text">Earned Media</span>
      </div>
    );
  }

  return (
    <div className="project-type">
      <span className="project-type-text">Unknown</span>
    </div>
  );
};
