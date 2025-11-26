export const IconPlay = ({ isPlaying }) => {
  return (
    <svg
      className="icon-play"
      width="10"
      height="19"
      viewBox="0 0 10 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: isPlaying ? "none" : "block" }}
    >
      <path
        d="M9.29846 9.50078L0.898438 0.800781V18.2008L9.29846 9.50078Z"
        fill="light-dark(var(--palette-black), var(--palette-white)"
      />
    </svg>
  );
};
