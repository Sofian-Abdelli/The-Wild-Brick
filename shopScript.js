const sliders = document.querySelectorAll(".shopSlider");

sliders.forEach(slider => {
  const track = slider.querySelector(".shopSliderTrack");
  const slides = slider.querySelectorAll(".shopSlide");
  const prev = slider.querySelector(".shopArrow.left");
  const next = slider.querySelector(".shopArrow.right");

  const slideWidth = slides[0].offsetWidth + 10;

  next.addEventListener("click", () => {
    track.scrollBy({ left: slideWidth, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -slideWidth, behavior: "smooth" });
  });

  track.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  const disableSnap = () => {
    track.dataset.snap = track.style.scrollSnapType;
    track.style.scrollSnapType = "none";
  };

  const enableSnap = () => {
    if (track.dataset.snap) {
      track.style.scrollSnapType = track.dataset.snap;
    } else {
      track.style.scrollSnapType = "";
    }
  };

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    disableSnap();
    track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    e.preventDefault();
  });

  track.addEventListener("mouseleave", () => {
    if (isDown) enableSnap();
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mouseup", () => {
    enableSnap();
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
});
