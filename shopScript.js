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
});