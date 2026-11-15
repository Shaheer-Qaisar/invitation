(function () {
  const config = window.INVITATION_CONFIG?.venue;
  if (!config) return;

  const intro = document.getElementById("intro");
  const envelope = document.getElementById("envelope");
  const introHint = document.getElementById("introHint");
  const mainContent = document.getElementById("mainContent");
  const scrollToVenue = document.getElementById("scrollToVenue");
  const venuePanel = document.getElementById("venuePanel");
  const venueName = document.getElementById("venueName");
  const mapEmbed = document.getElementById("mapEmbed");
  const openMaps = document.getElementById("openMaps");

  venueName.textContent = config.name;

  const query = encodeURIComponent(`${config.lat},${config.lng}`);
  mapEmbed.src = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

  function openInMaps() {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${config.lat},${config.lng}`
    )}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.assign(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  openMaps.addEventListener("click", openInMaps);

  scrollToVenue.addEventListener("click", () => {
    venuePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finishIntro() {
    intro.classList.add("intro--done");
    intro.setAttribute("aria-hidden", "true");
    mainContent.hidden = false;
    document.body.style.overflow = "";
  }

  function runIntroSequence() {
    if (reducedMotion) {
      finishIntro();
      return;
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        envelope.classList.add("envelope--open");
        introHint.textContent = "Your invitation awaits";
      }, 400);

      setTimeout(() => {
        envelope.classList.add("envelope--lift");
      }, 1200);

      setTimeout(finishIntro, 2200);
    });
  }

  document.body.style.overflow = "hidden";
  runIntroSequence();
})();