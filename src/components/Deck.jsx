import { useState, useEffect, useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

export const Deck = ({ deck }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const videoRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const containerRef = useRef(null);

  const currentAsset = deck.reel;

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
  const blur = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div className="deck subgrid">
      <div className="container" ref={containerRef}>
        <div className="reel sticky">
          <div className="lightbox">
            <div className="img-wrapper">
              <motion.video
                ref={videoRef}
                src={currentAsset.video?.mp4Url}
                loop
                muted
                autoPlay
                playsInline
                style={{ scale: scale4, filter: blurFilter }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div class="text">
        <h1>{deck.intro}</h1>
        <p>{deck.introParagraph}</p>
      </div>*/}
    </div>
  );
};
