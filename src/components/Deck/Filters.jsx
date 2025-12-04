import { useState } from "react";
import { useMobile } from "../../hooks/useMobile";

export const Filters = ({ activeFilter, setActiveFilter }) => {
  const [listOpen, setListOpen] = useState(false);

  const isMobile = useMobile();

  const filterConfig = [
    { label: "All", value: "all" },
    { label: "UGC", value: "ug" },
    { label: "Broadcast", value: "br" },
    { label: "Partnerships", value: "pa" },
    { label: "Studio", value: "st" },
  ];

  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue);
    if (isMobile) {
      setListOpen(false);
    }
  };

  const getActiveLabel = () => {
    const active = filterConfig.find((f) => f.value === activeFilter);
    return active ? `[${active.label}]` : "[All]";
  };

  if (!isMobile) {
    return (
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
    );
  }

  // Mobile view
  return (
    <fieldset className="filters">
      <legend className="sr-only">Filter projects by type</legend>

      <div className="active-filter">
        <button
          type="button"
          className="button"
          onClick={() => setListOpen(!listOpen)}
        >
          {getActiveLabel()}
        </button>
      </div>

      {listOpen && (
        <div className="filter-list">
          {filterConfig.map((filter) => {
            if (filter.value !== activeFilter) {
              return (
                <button
                  key={filter.value}
                  type="button"
                  className="button"
                  onClick={() => handleFilterChange(filter.value)}
                >
                  <span>{filter.label}</span>
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </fieldset>
  );
};
