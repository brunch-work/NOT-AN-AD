const caseStudies = document.querySelectorAll(
  "[light-box]"
) as NodeListOf<HTMLElement>;
const lightbox = document.querySelector("#lightbox") as HTMLDialogElement;
const lightboxContent = lightbox.querySelector(".modal-content") as HTMLElement;
const lightboxCloseButton = lightbox.querySelector(
  "button"
) as HTMLButtonElement;

// local state about whether the popover is currently open or not
const state = {
  open: false,
};

const { matches: motionOK } = window.matchMedia(
  "(prefers-reduced-motion: no-preference)"
);

if (motionOK) {
  caseStudies.forEach((item, i) => {
    const placeholder = item.querySelector(".placeholder") as HTMLElement;
    const figcaption = item.querySelector("figcaption") as HTMLElement;
    if (figcaption && placeholder)
      placeholder.style.viewTransitionName = `--case-study-placeholder-${i}`;
    figcaption.style.viewTransitionName = `--case-study-figcaption-${i}`;
  });

  // listen for clicks on each lightbox case study
  caseStudies.forEach((caseStudy: HTMLElement) => {
    caseStudy.addEventListener("click", (event) => {
      function openLightbox(cs: HTMLElement) {
        const plh = caseStudy.querySelector(".placeholder") as HTMLElement;
        const figc = caseStudy.querySelector("figcaption") as HTMLElement;

        // add styles to the document to make the clicked item appear on top
        document.styleSheets[0].insertRule(
          `::view-transition-group(${plh.style.getPropertyValue("view-transition-name")}), ::view-transition-group(${figc.style.getPropertyValue("view-transition-name")})  { z-index: 3; }`
        );

        plh.classList.add("lightbox-originator");
        figc.classList.add("lightbox-originator");

        // set up a placeholder instead of the caseStudy
        lightboxContent.innerHTML = cs.innerHTML;

        plh.style.display = "none";
        figc.style.display = "none";

        // now we call the API to put the popover lightbox into the :top-layer
        lightbox.showModal();
      }

      // if the lightbox is closed
      if (!state.open) {
        document.startViewTransition
          ? document.startViewTransition(() => openLightbox(caseStudy))
          : openLightbox(caseStudy);
      }
    });
  });

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    lightboxCloseButton.click();
  });

  lightboxCloseButton.addEventListener("click", () => {
    function closeLightbox() {
      const originators = document.querySelectorAll(
        ".lightbox-originator"
      ) as NodeListOf<HTMLElement>;
      // find the placeholder and figcaption with display none
      // restore their visibility
      originators[0].style.display = "block";
      originators[1].style.display = "flex";

      originators.forEach((originator) => {
        originator.style.display = "";
        originator.classList.remove("lightbox-originator");
      });

      // empty the lightbox's content
      lightboxContent.innerHTML = "";

      lightbox.close();
      state.open = false;

      document.styleSheets[0].deleteRule(0);
    }

    document.startViewTransition
      ? document.startViewTransition(() => closeLightbox())
      : closeLightbox();
  });
}
