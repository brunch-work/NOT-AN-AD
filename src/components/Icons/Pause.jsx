export const IconPause = ({ isPlaying }) => {
  return (
    <svg
      className="icon-pause"
      width="25"
      height="27"
      viewBox="0 0 25 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: isPlaying ? "block" : "none" }}
    >
      <path
        d="M9.79688 0.599609H0.796875V26.1996H9.79688V0.599609Z"
        fill="light-dark(var(--palette-black), var(--palette-white)"
      />
      <path
        d="M24.5 0.599609H15.5V26.1996H24.5V0.599609Z"
        fill="light-dark(var(--palette-black), var(--palette-white)"
      />
    </svg>
  );
};
