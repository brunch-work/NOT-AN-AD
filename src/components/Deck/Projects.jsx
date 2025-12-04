import { useState, useEffect, useRef } from "react";

import { Filters } from "./Filters";
import { ProjectCard } from "./ProjectCard";
import { Lightbox } from "../Lightbox";

export const Projects = ({ deck }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(null);
  const dialogRef = useRef(null);

  // Filter projects based on the active filter
  const filteredProjects =
    activeFilter === "all"
      ? deck.projects
      : deck.projects.filter((project) => project.projectType === activeFilter);

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  const handleProjectClick = (project) => {
    setActiveProject(project);

    // Dispatch custom event to update the lightbox index
    window.dispatchEvent(
      new CustomEvent("openLightbox", { detail: { index: 0 } }),
    );

    // Toggle dialog visibility
    if (dialogRef.current) {
      dialogRef.current.classList.toggle("show");
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Close dialog on outside click
    const handleDialogClick = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        dialog.classList.remove("show");
      }
    };

    dialog.addEventListener("click", handleDialogClick);

    return () => {
      dialog.removeEventListener("click", handleDialogClick);
    };
  }, []);

  return (
    <div className="projects">
      <div className="top">
        <Filters
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
        />
      </div>
      <div className="list">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onProjectClick={handleProjectClick}
          />
        ))}
      </div>

      {/* Single shared dialog for all projects */}
      {activeProject && (
        <dialog
          ref={dialogRef}
          id="lightbox-dialog"
          className="lightbox-dialog"
        >
          <div className="grid">
            <div className="subgrid">
              <div id="lightbox-wrapper" className="lightbox-wrapper">
                <Lightbox
                  assets={activeProject.project.assets}
                  index={0}
                  isDeck={true}
                  projectDataMap={activeProject.project}
                />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
