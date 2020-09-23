import $ from "jquery";
import Swiper from "swiper";

const baseSettings = {
  loop: true,
  allowTouchMove: false,
  speed: 500,
};
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
    this.product_detail_list();
    this.fs_bigSlider();
    this.product_passport();
  }
  product_passport() {
    this.sliders["product_passport"] = new Swiper(
      ".card-product_passport .swiper-container",
      {
        ...baseSettings,
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        autoHeight: true,
        navigation: {
          nextEl: $(".passport-control-next"),
          prevEl: $(".passport-control-prev"),
        },
      }
    );
  }
  fs_steps() {
    this.sliders["fs_steps"] = [];
    $(".fs-steps_middle .swiper-container").each((key, item) => {
      this.sliders["fs_steps"][key] = new Swiper(item, {
        ...baseSettings,
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        autoHeight: true,
        navigation: {
          nextEl: $(item).parent().find(".fs-steps_control-next"),
          prevEl: $(item).parent().find(".fs-steps_control-prev"),
        },
      });
    });
  }
  fs_products() {
    this.sliders["fs_products"] = [];
    $(".fs-production_showcase .swiper-container").each((key, item) => {
      this.sliders["fs_products"][key] = new Swiper(item, {
        ...baseSettings,
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
        autoHeight: true,
        navigation: {
          nextEl: $(item).parent().find(".fs-production_showcase-next"),
          prevEl: $(item).parent().find(".fs-production_showcase-prev"),
        },
      });
    });
  }
  product_detail_list() {
    this.sliders["product_list"] = new Swiper(
      ".product-list_slider.swiper-container",
      {
        ...baseSettings,
        slidesPerView: 4,
        spaceBetween: 40,
        slidesPerGroup: 3,
        autoHeight: true,
        navigation: {
          nextEl: $(".product-list-next"),
          prevEl: $(".product-list-prev"),
        },
      }
    );
  }
  fs_bigSlider() {
    this.sliders["fs_bigSlider"] = [];
    $(".fs-bigSlider .swiper-container.fs-bigSlider_main").each((key, item) => {
      this.sliders["fs_bigSlider"][key] = new Swiper(item, {
        ...baseSettings,
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        autoHeight: true,
        thumbs: {
          swiper: {
            el: $(item)
              .closest(".fs-bigSlider")
              .find(".swiper-container.fs-bigSlider_preview"),
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
            allowTouchMove: false,
          },
        },
        navigation: {
          nextEl: $(item).closest(".fs-bigSlider").find(".fs-bigSlider_next"),
          prevEl: $(item).closest(".fs-bigSlider").find(".fs-bigSlider_prev"),
        },
      });
    });
  }
  fs_objects() {
    this.sliders["fs_objects"] = new Swiper(
      ".fs-objects_objects .swiper-container",
      {
        ...baseSettings,
        slidesPerView: 1,
        spaceBetween: 50,
        slidesPerGroup: 1,
        navigation: {
          nextEl: ".fs-objects_next",
          prevEl: ".fs-objects_prev",
        },
      }
    );
  }
  trainerSlider() {
    this.sliders["trainers"] = new Swiper(".trainers-swiper", {
      ...baseSettings,
      slidesPerView: 3,
      spaceBetween: 50,
      navigation: {
        nextEl: ".trainers-control-prev",
        prevEl: ".trainers-control-next",
      },
    });
  }
}
