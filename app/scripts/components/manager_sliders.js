import $ from "jquery";
import Swiper from "swiper";

export default class Managers_sliders {
  constructor() {
    this.sliders = [];
    this.init();
  }
  init() {
    this.trainerSlider();
    this.fsObjectsCFTKSlider();
  }
  fsObjectsCFTKSlider() {
    this.sliders["fsObjectsCFTK"] = new Swiper(".fsObjectsCFTK-objects .swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
      slidesPerGroup: 1,
      allowTouchMove: false,
      speed: 500,

      navigation: {
        nextEl: ".fsObjectsCFTK-next",
        prevEl: ".fsObjectsCFTK-prev",
      },
    });
  }
  trainerSlider() {
    this.sliders["trainers"] = new Swiper(".trainers-swiper", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 50,
      allowTouchMove: false,
      speed: 500,

      navigation: {
        nextEl: ".trainers-control-prev",
        prevEl: ".trainers-control-next",
      },
    });
  }
}
