import { useState, useEffect, useRef } from "react";

import { ProjectCard } from "./ProjectCard";

export const Projects = ({ deck }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter projects based on the active filter
  const filteredProjects =
    activeFilter === "all"
      ? deck.projects
      : deck.projects.filter((project) => project.projectType === activeFilter);

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
  };

  return (
    <div className="projects">
      <div className="top">
        <fieldset className="filters">
          <legend className="sr-only">Filter projects by type</legend>

          <input
            type="radio"
            id="filter-all"
            name="project-filter"
            value="all"
            checked={activeFilter === "all"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="filter-all" className="button">
            <span>{activeFilter === "all" ? "[All]" : "All"}</span>
          </label>

          <input
            type="radio"
            id="filter-partnership"
            name="project-filter"
            value="ug"
            checked={activeFilter === "ug"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="filter-partnership" className="button">
            <span>{activeFilter === "ug" ? "[UGC]" : "UGC"}</span>
          </label>

          <input
            type="radio"
            id="filter-strategy"
            name="project-filter"
            value="br"
            checked={activeFilter === "br"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="filter-strategy" className="button">
            <span>{activeFilter === "br" ? "[Broadcast]" : "Broadcast"}</span>
          </label>

          <input
            type="radio"
            id="filter-content-creation"
            name="project-filter"
            value="st"
            checked={activeFilter === "st"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="filter-content-creation" className="button">
            <span>{activeFilter === "st" ? "[Studio]" : "Studio"}</span>
          </label>

          <input
            type="radio"
            id="filter-amplification"
            name="project-filter"
            value="pa"
            checked={activeFilter === "pa"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="sr-only"
          />
          <label htmlFor="filter-amplification" className="button">
            <span>
              {activeFilter === "pa" ? "[Partnerships]" : "Partnerships"}
            </span>
          </label>
        </fieldset>
      </div>
      <div className="list">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};
