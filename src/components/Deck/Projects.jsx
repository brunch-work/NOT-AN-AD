import { ProjectType } from "../ProjectType";

export const Projects = ({ deck }) => {
  return (
    <div className="projects">
      <div className="top">
        <ul className="filters">
          <li>
            <span>all</span>
          </li>
          <li>
            <span>ugc</span>
          </li>
          <li>
            <span>broadcast</span>
          </li>
          <li>
            <span>studio</span>
          </li>
          <li>
            <span>partnerships</span>
          </li>
        </ul>
      </div>
      <div className="list">
        {deck.projects.map((project, index) => {
          console.log(project);
          return (
            <article key={project.id} className="project">
              <span>{`${project.projectType}_${String(index).padStart(2, "0")}`}</span>
              <div className="project-info">
                <h3>{project.projectTitle}</h3>
                <p>{project.projectDescription}</p>
              </div>
              <div className="photo featured">
                <img
                  src={project.project.assets[0].url}
                  alt={project.project.assets[0].alt}
                />
              </div>
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
            </article>
          );
        })}
      </div>
    </div>
  );
};
