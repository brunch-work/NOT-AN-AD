import IconStrategy from "../assets/images/svg/icon_strategy.svg?react";
import IconPartnership from "../assets/images/svg/icon_partnerships.svg?react";
import IconAmplification from "../assets/images/svg/icon_amplification.svg?react";
import IconContent from "../assets/images/svg/icon_content.svg?react";
import IconEarnedMedia from "../assets/images/svg/icon_earned_media.svg?react";

export const CaseStudy = ({ id, title, category, year, url, alt, format }) => {
  const renderIcon = (category) => {
    if (category === "strategy") {
      return <IconStrategy width="1em" height="1em" fill="currentColor" />;
    }

    if (category === "partnership") {
      return <IconPartnership width="1em" height="1em" fill="currentColor" />;
    }

    if (category === "amplification") {
      return <IconAmplification width="1em" height="1em" fill="currentColor" />;
    }

    if (category === "content-creation") {
      return <IconContent width="1em" height="1em" fill="currentColor" />;
    }

    if (category === "earned-media") {
      return <IconEarnedMedia width="1em" height="1em" fill="currentColor" />;
    }
  };

  return (
    <li>
      <figure class="content-slot" data-type={category}>
        <button light-box>
          <div class="case-study__asset">
            {format === "mp4" || format === "webm" ? (
              <video
                onMouseEnter={(event) => event.target.play()}
                onMouseLeave={(event) => event.target.pause()}
                src={url}
                loop
                muted
                playsinline
              />
            ) : (
              <img src={url} alt={alt} />
            )}
          </div>
          <figcaption>
            <span class="content-title">{title}</span>
            <span class="content-category">{category}</span>
            <span class="content-icon">{renderIcon(category)}</span>
            <span class="content-year">{year}</span>
          </figcaption>
        </button>
      </figure>
    </li>
  );
};
