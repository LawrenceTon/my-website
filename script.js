const progressBar = document.getElementById("progress-meter-bar");
const revealItems = document.querySelectorAll(".reveal");
const depthItems = document.querySelectorAll("[data-depth]");
const sections = document.querySelectorAll("[data-section]");
const heroSection = document.querySelector(".hero");
const storySection = document.getElementById("story");
const storySteps = document.querySelectorAll(".signal-step");
const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const rootStyle = document.documentElement.style;
let isTicking = false;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${clamp(progress, 0, 100)}%`;
  rootStyle.setProperty("--scroll-ratio", (clamp(progress, 0, 100) / 100).toFixed(4));

  if (heroSection) {
    const heroProgress = getSectionProgress(heroSection);
    rootStyle.setProperty("--hero-progress", heroProgress.toFixed(4));
  }
}

function getSectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const total = window.innerHeight + rect.height;
  return clamp((window.innerHeight - rect.top) / total, 0, 1);
}

function updateSectionState() {
  let markedCurrent = false;
  let activeScene = "hero";
  let activeProgress = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = getSectionProgress(section);
    const inView = rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.3;

    if (inView && !markedCurrent) {
      section.dataset.current = "true";
      markedCurrent = true;
      activeScene = section.dataset.section || activeScene;
      activeProgress = progress;
    } else {
      section.dataset.current = "false";
    }

    if (section === storySection) {
      rootStyle.setProperty("--story-progress", progress.toFixed(4));
    }
  });

  document.body.dataset.scene = activeScene;
  rootStyle.setProperty("--scene-progress", activeProgress.toFixed(4));
}

function updateStoryState() {
  if (!storySection) {
    return;
  }

  const progress = getSectionProgress(storySection);
  rootStyle.setProperty("--story-progress", progress.toFixed(4));

  let activeStep = null;
  let closestDistance = Number.POSITIVE_INFINITY;
  let activeIndex = 0;

  storySteps.forEach((step, index) => {
    const rect = step.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - window.innerHeight * 0.42);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeStep = step;
      activeIndex = index + 1;
    }
  });

  storySteps.forEach((step) => {
    step.classList.toggle("is-active", step === activeStep);
  });

  storySection.dataset.activeStep = String(activeIndex);
}

function updateDepth() {
  if (motionReduced.matches) {
    depthItems.forEach((item) => {
      item.style.removeProperty("--shift-x");
      item.style.removeProperty("--shift-y");
      item.style.removeProperty("--spin");
      item.style.removeProperty("--zoom");
    });
    return;
  }

  const viewportCenter = window.innerHeight / 2;

  depthItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const distance = clamp((elementCenter - viewportCenter) / window.innerHeight, -1.2, 1.2);
    const shiftXFactor = Number(item.dataset.shiftX || 0);
    const shiftYFactor = Number(item.dataset.shiftY || 0);
    const rotateFactor = Number(item.dataset.rotate || 0);
    const scaleFactor = Number(item.dataset.scale || 0);
    const shiftX = distance * shiftXFactor * -140;
    const shiftY = distance * shiftYFactor * -180;
    const spin = distance * rotateFactor * -1;
    const zoom = 1 + (1 - Math.abs(distance)) * scaleFactor;

    item.style.setProperty("--shift-x", `${shiftX.toFixed(2)}px`);
    item.style.setProperty("--shift-y", `${shiftY.toFixed(2)}px`);
    item.style.setProperty("--spin", `${spin.toFixed(2)}deg`);
    item.style.setProperty("--zoom", zoom.toFixed(4));
  });
}

function onScroll() {
  updateProgress();
  updateSectionState();
  updateStoryState();
  updateDepth();
}

function scheduleUpdate() {
  if (isTicking) {
    return;
  }

  isTicking = true;
  window.requestAnimationFrame(() => {
    onScroll();
    isTicking = false;
  });
}

function onPointerMove(event) {
  if (motionReduced.matches) {
    return;
  }

  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;
  rootStyle.setProperty("--pointer-x", `${x.toFixed(2)}px`);
  rootStyle.setProperty("--pointer-y", `${y.toFixed(2)}px`);
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
window.addEventListener("pointermove", onPointerMove, { passive: true });
window.addEventListener("pointerleave", () => {
  rootStyle.setProperty("--pointer-x", "0px");
  rootStyle.setProperty("--pointer-y", "0px");
});
motionReduced.addEventListener("change", scheduleUpdate);

updateProgress();
updateSectionState();
updateStoryState();
updateDepth();
