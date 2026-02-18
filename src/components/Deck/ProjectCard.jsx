import { useEffect, useRef } from "react";
import { ProjectType } from "../ProjectType";
import { useMobile } from "../../hooks/useMobile";

export const ProjectCard = ({ project, index, onProjectClick }) => {
  const isMobile = useMobile();
  const cardRef = useRef(null);

  const renderAsset = (asset) => {
    if (
      asset.format === "jpg" ||
      asset.format === "png" ||
      asset.format === "webp"
    ) {
      return (
        <div
          className="asset-media"
          style={{
            backgroundImage: `url('${asset.responsiveImage?.base64}')`,
            aspectRatio: asset.responsiveImage?.aspectRatio,
          }}
        >
          <img
            src={asset.responsiveImage?.src || asset.url}
            srcSet={asset.responsiveImage?.webpSrcSet}
            sizes={asset.responsiveImage?.sizes}
            alt={asset.responsiveImage?.alt || asset.alt}
            width={asset.responsiveImage?.width}
            height={asset.responsiveImage?.height}
            loading="lazy"
            decoding="async"
            onLoad={(e) =>
              e.currentTarget.closest(".asset-media")?.classList.add("is-loaded")
            }
          />
        </div>
      );
    } else if (
      asset.format === "mp4" ||
      asset.format === "webm" ||
      asset.format === "mov"
    ) {
      return (
        <div
          className="asset-media"
          style={{ aspectRatio: asset.video.width / asset.video.height }}
        >
          <video
            data-src={asset.video.mp4Url}
            poster={asset.video.thumbnailUrl}
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
      );
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;

    // Handle already-cached images
    cardRef.current.querySelectorAll(".asset-media img").forEach((img) => {
      if (img.complete) {
        img.closest(".asset-media")?.classList.add("is-loaded");
      }
    });

    // Lazy load videos via IntersectionObserver
    const loadVideo = (video) => {
      const src = video.getAttribute("data-src");
      if (src && !video.src) {
        video.src = src;
        video.preload = "metadata";
        video.load();
        video.addEventListener(
          "loadeddata",
          () => {
            video.closest(".asset-media")?.classList.add("is-loaded");
            video.play().catch(() => {});
          },
          { once: true },
        );
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px 0px" },
    );

    cardRef.current.querySelectorAll("video[data-src]").forEach((video) => {
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const hiddenAssets = project.project.assets.slice(1, 4);

  if (isMobile) {
    return (
      <button
        ref={cardRef}
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
      ref={cardRef}
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
