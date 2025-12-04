import { useState, useEffect, useRef } from "react";
import { Logo } from "../Icons/Logo";
import { Projects } from "./Projects";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

export const Deck = ({ deck }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Ensure video plays on mount and when asset changes
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          videoRef.current.muted = true;
          videoRef.current.volume = 0;
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        }
      };
      // Small delay to ensure video element is ready
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const videoFilter = useMotionTemplate`blur(${blur}px) brightness(${brightness})`;

  return (
    <div className="deck subgrid">
      <div className="intro container" ref={containerRef}>
        <div className="reel sticky">
          <div className="lightbox">
            <div className="img-wrapper">
              <motion.video
                ref={videoRef}
                src={deck.reel.video?.mp4Url}
                loop
                muted
                autoPlay
                playsInline
                style={{ scale: scale4, filter: videoFilter }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="info">
          <Logo />
          <h1>{deck.intro}</h1>
          <p>{deck.introParagraph}</p>
        </div>

        <Projects deck={deck} />
      </div>
    </div>
  );
};
