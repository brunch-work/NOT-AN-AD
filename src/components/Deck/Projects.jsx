export const Projects = ({ deck }) => {
  console.log(deck);

  return (
    <div className="projects">
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
      <div className="list">
        {deck.projects.map((project) => {
          return (
            <article key={project.id}>
              <h3>{project.projectTitle}</h3>
            </article>
          );
        })}
      </div>
    </div>
  );
};
