import Swiper from "swiper";

export default class Managers_sliders {
  constructor() {
    this.sliders = [];
    this.init();
  }
  init() {
    this.trainerSlider();
  }
  trainerSlider() {
    this.sliders["trainers"] = new Swiper(".trainers .slides", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 50,
      allowTouchMove: false,
      speed: 500,

      navigation: {
        nextEl: ".trainers .next",
        prevEl: ".trainers .prev",
      },
    });
  }
}
