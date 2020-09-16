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
    this.fs_bigSlider();
  }
  fs_products() {
    this.sliders["fs_products"] = [];
    $('.fs-production_showcase .swiper-container').each((key,item)=>{
      this.sliders["fs_products"][key] = new Swiper(item, {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 40,
        slidesPerGroup: 3,
        allowTouchMove: false,
        speed: 500,
        autoHeight: true,
        navigation: {
          nextEl: $(item).parent().find('.fs-objects_next'),
          prevEl: $(item).parent().find('.fs-objects_prev'),
        },
      });
    })
    
  }
  fs_bigSlider() {
    this.sliders["fs_bigSlider"] = [];
    $('.fs-bigSlider .swiper-container.fs-bigSlider_main').each((key,item)=>{
      this.sliders["fs_bigSlider"][key] = new Swiper(item, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 40,
        slidesPerGroup: 1,
        allowTouchMove: false,
        speed: 500,
        autoHeight: true,
        thumbs: {
          swiper: {
            el: $(item).closest('.fs-bigSlider').find('.swiper-container.fs-bigSlider_preview'),
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
            allowTouchMove: false,
          },
        },
        navigation: {
          nextEl: $(item).closest('.fs-bigSlider').find('.fs-bigSlider_next'),
          prevEl: $(item).closest('.fs-bigSlider').find('.fs-bigSlider_prev'),
        },
      });
    })
    
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
