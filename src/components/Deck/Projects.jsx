import { useState, useEffect, useRef } from "react";

import { ProjectCard } from "./ProjectCard";

export const Projects = ({ deck }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="projects">
      <div className="top">
        <ul className="filters">
          <li className="button">
            <span>all</span>
          </li>
          <li className="button">
            <span>ugc</span>
          </li>
          <li className="button">
            <span>broadcast</span>
          </li>
          <li className="button">
            <span>studio</span>
          </li>
          <li className="button">
            <span>partnerships</span>
          </li>
        </ul>
      </div>
      <div className="list">
        {deck.projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};
