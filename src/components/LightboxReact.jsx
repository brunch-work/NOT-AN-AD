import { useState, useEffect, useRef } from "react";

import { IconVolume } from "./Icons/Volume";
import { IconVolumeOff } from "./Icons/VolumeOff";
import { IconPause } from "./Icons/Pause";
import { IconBack } from "./Icons/Back";
import { IconForward } from "./Icons/Forward";
import { IconPlay } from "./Icons/Play";
import { IconHome } from "./Icons/Home";
import { IconDot } from "./Icons/Dot";

export const LightboxReact = ({
  assets,
  index: initialIndex,
  projectDataMap,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("00:00:00:00");

  const videoRef = useRef(null);

  const currentAsset = assets[currentIndex];
  const currentProject = projectDataMap?.[currentAsset.id];

  const isVideo =
    currentAsset.format === "mp4" ||
    currentAsset.format === "webm" ||
    currentAsset.format === "mov";

  // Listen for lightbox open event
  useEffect(() => {
    const handleOpenLightbox = (e) => {
      setCurrentIndex(e.detail.index);
      setCurrentTime("00:00:00:00");
      setIsPlaying(true);
      setIsMuted(true);
      setInfoOpen(false);
    };

    window.addEventListener("openLightbox", handleOpenLightbox);

    return () => {
      window.removeEventListener("openLightbox", handleOpenLightbox);
    };
  }, []);

  // Ensure video plays on mount and when asset changes
  useEffect(() => {
    if (isVideo && videoRef.current) {
      const playVideo = async () => {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsPlaying(true);
          setIsMuted(true);
        } catch (err) {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        }
      };
      // Small delay to ensure video element is ready
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [isVideo, currentIndex]);

  // Update time display
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const updateTime = () => {
      const video = videoRef.current;
      if (!video) return;

      const currentSeconds = video.currentTime;
      const hours = Math.floor(currentSeconds / 3600);
      const minutes = Math.floor((currentSeconds % 3600) / 60);
      const seconds = Math.floor(currentSeconds % 60);
      const frames = Math.floor((currentSeconds % 1) * 30); // Assuming 30fps

      const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
      setCurrentTime(timeString);
    };

    const video = videoRef.current;
    video.addEventListener("timeupdate", updateTime);

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [isVideo, currentIndex]);

  // Play/Pause toggle
  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((err) => console.log("Play error:", err));
      setIsPlaying(true);
    }
  };

  // Mute/Unmute toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // Volume control
  const handleVolumeChange = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = rect.bottom - e.clientY; // vertical slider
    const newVolume = Math.max(0, Math.min(1, y / rect.height));

    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    if (newVolume > 0 && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  // Navigation
  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : assets.length - 1;
    setCurrentIndex(newIndex);
    setCurrentTime("00:00:00:00");
    setIsPlaying(true);
    setIsMuted(true);
    setInfoOpen(false);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex < assets.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setCurrentTime("00:00:00:00");
    setIsPlaying(true);
    setIsMuted(true);
    setInfoOpen(false);
  };

  // Home navigation (close lightbox)
  const goHome = (e) => {
    e.stopPropagation();
    const dialog = document.getElementById("lightbox-dialog");
    if (dialog) {
      dialog.classList.toggle("show");
    }
  };

  // Toggle info popup
  const toggleInfo = (e) => {
    e.stopPropagation();
    setInfoOpen(!infoOpen);
  };

  // Get video URL
  const videoUrl = currentAsset.video?.mp4Url || currentAsset.url;

  return (
    <div className="lightbox">
      {isVideo ? (
        <video
          ref={videoRef}
          src={videoUrl}
          loop
          muted
          autoPlay
          playsInline
          key={`video-${currentIndex}`}
        />
      ) : (
        <img
          src={currentAsset.url}
          alt={currentAsset.alt}
          key={`image-${currentIndex}`}
        />
      )}

      <div className="video-controls">
        <div className="top-controls">
          {isVideo && (
            <div className="volume-controls">
              <button
                id="mute-btn"
                className="control-btn"
                aria-label="Toggle mute"
                onClick={toggleMute}
              >
                <IconVolume isMuted={isMuted} />
                <IconVolumeOff isMuted={isMuted} />
              </button>

              <div
                className="custom-volume-slider"
                onClick={handleVolumeChange}
              >
                <div className="volume-track" />
                <div
                  className="volume-indicator"
                  style={{ bottom: `${volume * 100}%` }}
                >
                  <svg width="8" height="12" viewBox="0 0 8 12">
                    <polygon points="0,6 8,0 8,12" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="home">
            <button
              id="home-btn"
              className="control-btn"
              aria-label="Close Lightbox"
              onClick={goHome}
            >
              <IconHome className="icon-home" />
            </button>
          </div>
        </div>
        <div className="bottom-controls">
          <div className="playback-controls">
            <button
              id="back"
              className="control-btn"
              aria-label="Previous Media"
              onClick={goToPrevious}
            >
              <IconBack />
            </button>
            {isVideo && (
              <button
                id="play-pause-btn"
                className="control-btn"
                aria-label="Play/Pause"
                onClick={togglePlayPause}
              >
                <IconPause isPlaying={isPlaying} />
                <IconPlay isPlaying={isPlaying} />
              </button>
            )}
            <button
              id="forward"
              className="control-btn"
              aria-label="Next Media"
              onClick={goToNext}
            >
              <IconForward />
            </button>
          </div>
          {currentProject && (
            <div className="project-info">
              <button id="info-btn" onClick={toggleInfo}>
                Information
                <svg
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 -1.96701e-07L9 7L0 7L4.5 -1.96701e-07Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div className={`popup ${infoOpen ? "visible" : ""}`}>
                <div className="project">{currentProject.clientName}</div>
                <div className="type">{currentProject.projectType}</div>
                <div className="year">
                  {new Date(currentProject.publicationDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                    },
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="time-display">
            {isVideo && <IconDot className="icon-dot" />}
            <span id="lightbox-current-time">{currentTime}</span>
          </div>
        </div>
        <div className="margin"></div>
      </div>
    </div>
  );
};
