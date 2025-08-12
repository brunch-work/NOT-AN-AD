import IconAmplification from "../assets/images/svg/icon_amplification.svg";
import IconContent from "../assets/images/svg/icon_content.svg";
import IconEarnedMedia from "../assets/images/svg/icon_earned_media.svg";
import IconPartnership from "../assets/images/svg/icon_partnerships.svg";
import IconStrategy from "../assets/images/svg/icon_strategy.svg";

export const renderIcon = (category: string) => {
  console.log(IconAmplification);

  switch (category) {
    case "strategy":
      return <IconStrategy width="1em" height="1em" fill="currentColor" />;
    case "partnership":
      return <IconPartnership width="1em" height="1em" fill="currentColor" />;
    case "amplification":
      return <IconAmplification width="1em" height="1em" fill="currentColor" />;
    case "content-creation":
      return <IconContent width="1em" height="1em" fill="currentColor" />;
    case "earned-media":
      return <IconEarnedMedia width="1em" height="1em" fill="currentColor" />;
    default:
      return null;
  }
};
