import { useState } from "react";

import { Lightbox } from "../Lightbox";
import { ProjectType } from "../ProjectType";
import { calcGeneratorDuration } from "motion/react";

export const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <article
      key={project.id}
      className="project"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{`${project.projectType}_${String(index).padStart(2, "0")}`}</span>
      <div className="project-info">
        <h3>{project.projectTitle}</h3>
        <p>{project.projectDescription}</p>
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
      <dialog id="lightbox-dialog" className="lightbox-dialog">
        <div className="grid">
          <div className="subgrid">
            <div id="lightbox-wrapper" className="lightbox-wrapper">
              <Lightbox
                assets={project.project.assets}
                index={0}
                // projectDataMap={projectDataMap}
              />
            </div>
          </div>
        </div>
      </dialog>
    </article>
  );
};
