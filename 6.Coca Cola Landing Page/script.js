"use script";

let swiper = new Swiper(".swiper-container", {
  pagination: ".swiper-pagination",
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflow: {
    rotate: 0,
    stretch: 0,
    depth: 0,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
});
