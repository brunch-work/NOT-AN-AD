import { ProjectType } from "../ProjectType";
import { useMobile } from "../../hooks/useMobile";

export const ProjectCard = ({ project, index, onProjectClick }) => {
  const isMobile = useMobile();

  const renderAsset = (asset) => {
    if (
      asset.format === "jpg" ||
      asset.format === "png" ||
      asset.format === "webp"
    ) {
      return <img src={asset.url} alt={asset.alt} />;
    } else if (
      asset.format === "mp4" ||
      asset.format === "webm" ||
      asset.format === "mov"
    ) {
      return (
        <video
          src={asset.url}
          alt={asset.alt}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
      );
    }
  };

  const hiddenAssets = project.project.assets.slice(1, 4);

  if (isMobile) {
    return (
      <button
        key={project.id}
        className="project"
        onClick={() => onProjectClick(project)}
        aria-label={`View ${project.projectTitle}`}
      >
        <div className="project__top">
          <span>{`${project.projectType}_${String(index).padStart(2, "0")}`}</span>
          <span>
            {new Date(project.project.publicationDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
              },
            )}
          </span>
        </div>
        <div className="project-info">
          <h3>{project.projectTitle}</h3>
          <p>{project.project.projectDescription}</p>
        </div>
        <div className="asset featured">
          {renderAsset(project.project.assets[0])}
          <div className="overlay">
            <span>View</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      key={project.id}
      className="project"
      onClick={() => onProjectClick(project)}
      aria-label={`View ${project.projectTitle}`}
    >
      <span>{`${project.projectType}_${String(index).padStart(2, "0")}`}</span>
      <div className="project-info">
        <h3>{project.projectTitle}</h3>
        <p>{project.project.projectDescription}</p>
      </div>
      <div className="asset featured">
        {renderAsset(project.project.assets[0])}
        <div className="overlay">
          <span>View</span>
        </div>
      </div>
      {hiddenAssets.map((asset, index) => (
        <div className="asset" key={index}>
          {renderAsset(asset)}
        </div>
      ))}
      <div className="type">
        <ProjectType type={project.project.projectType} />
      </div>
      <div className="year">
        <span>
          {new Date(project.project.publicationDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
            },
          )}
        </span>
      </div>
    </button>
  );
};
