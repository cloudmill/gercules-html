import $ from "jquery";
import Swiper from "swiper";
import select2 from "select2";

//Tools
import Listener from './tools/listener';

export default class App {
  constructor() {
    window.globalListener = new Listener();

    const trainersSlider = new Swiper(".trainers .slides", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 50,
      allowTouchMove: false,
      speed: 500,

      navigation: {
        nextEl: '.trainers .next',
        prevEl: '.trainers .prev',
      },
    });

    $(".calendar #location").select2({
      minimumResultsForSearch: -1
    });
  }
};
