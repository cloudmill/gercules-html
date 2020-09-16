import $ from "jquery";
import Swiper from "swiper";

export default class Managers_sliders {
  constructor() {
    this.sliders = [];
    this.init();
  }
  init() {
    this.trainerSlider();
    this.fs_objects();
    this.fs_products();
    this.fs_steps();
  }
  fs_steps() {
    this.sliders["fs_steps"] = new Swiper(".fs-steps_middle .swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
      slidesPerGroup: 1,
      allowTouchMove: false,
      speed: 500,
      autoHeight: true,

      navigation: {
        nextEl: ".fs-steps_control-next",
        prevEl: ".fs-steps_control-prev",
      },
    });
  }
  fs_products() {
    this.sliders["fs_products"] = new Swiper(".fs-production_showcase .swiper-container", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 40,
      slidesPerGroup: 3,
      allowTouchMove: false,
      speed: 500,
      autoHeight: true,

      navigation: {
        nextEl: ".tabs-item.active .fs-objects_next",
        prevEl: ".tabs-item.active .fs-objects_prev",
      },
    });
  }
  fs_objects() {
    this.sliders["fs_objects"] = new Swiper(".fs-objects_objects .swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
      slidesPerGroup: 1,
      allowTouchMove: false,
      speed: 500,

      navigation: {
        nextEl: ".fs-objects_next",
        prevEl: ".fs-objects_prev",
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
