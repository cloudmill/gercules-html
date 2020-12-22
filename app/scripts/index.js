import $ from "jquery";
import "select2";
import Swiper from "swiper";

import App from "./main.js";

// modules
import "./components/SelectTags.js";

$(document).ready(function () {
  let app = new App();
  window.app = app;

  selectInputs();

  sideNav();

  hashPanel();

  bObjectSliders();

  tabs();

  fileInputs();

  videosPage();
});

function videosPage() {
  const
    FILTER_CLASS = 'videos__filter',
    FILTER_RESET_CLASS = 'videos__filter-button',
    FILTER_SELECT_CLASS = 'videos__filter-select';

  $('.' + FILTER_CLASS).find('select').select2({
    theme: 'my-theme',
    width: '100%',
    minimumResultsForSearch: Infinity,
  });

  $('.' + FILTER_RESET_CLASS).on('click', () => {
    setTimeout(() => {
      $('.' + FILTER_SELECT_CLASS).trigger('change');
    }, 0);
  });
}

function fileInputs() {
  if ($('.js--file-input').length) {
    $('.js--file-input').each(function (index, input) {
      addFileName($(input));
    });

    $('.js--file-input').on('change', function () {
      addFileName($(this));
    });
  }

  function addFileName($input) {
    const box = $input.closest('.file-input');
    const nameBox = box.find('.file-input__name');
    const files = $input[0].files;
    const placeholder = $input.attr('placeholder');

    if (files.length) {
      nameBox.html(files[0].name);
      nameBox.removeClass('file-input__name--placeholder');
    } else {
      nameBox.html(placeholder);
      nameBox.addClass('file-input__name--placeholder');
    }
  }
}

function tabs() {
  $(".tabs").each(function () {
    const
      panel = $(this).find(".tabs__panel"),
      content = $(this).find(".tabs__content");

    panel.find(".tabs__panel-item").on("click", function () {
      $(".tabs__panel-item").removeClass("tabs__panel-item--active");
      $(this).addClass("tabs__panel-item--active");
      $(".tabs__content-item").removeClass("tabs__content-item--active");
      content.find(`[data-tab="${$(this).data("tab")}"]`).addClass("tabs__content-item--active");
    });
  });
}

function bObjectSliders() {
  $(".tabs__content-item").each(function () {
    const slider = new Swiper(
      $(this).find(".swiper-container")[0],
      {
        loop: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 40,
        autoHeight: true,
        navigation: {
          nextEl: $(this).find(".b-object__tab-btn--right")[0],
          prevEl: $(this).find(".b-object__tab-btn--left")[0],
        },
      }
    );
  });

  $(".b-object-slider").each(function () {
    const slider = new Swiper(
      $(this).find(".b-object-slider__photo .swiper-container")[0],
      {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        setWrapperSize: true,
        autoHeight: true,
        thumbs: {
          swiper: {
            el: $(this).find(".b-object-slider__thumb .swiper-container")[0],
            spaceBetween: 10,
            slidesPerView: $(this).find(".b-object-slider__thumb .swiper-slide").length,
            allowTouchMove: false,
          }
        }
      }
    )
  });
  // const photos_count = $(".card-sliders_photos .swiper-slide").length;
  // this.sliders["card_sliders"] = new Swiper(
  //   ".card-sliders_photos .swiper-container",
  //   {
  //     loop: true,
  //     speed: 500,  
  //     spaceBetween: 60,
  //     slidesPerView: 1,
  //     slidesPerGroup: 1,
  //     thumbs: {
  //       swiper: {
  //         el: $(".card-sliders_thumbs .swiper-container"),
  //         direction: "vertical",
  //         spaceBetween: 20,
  //         slidesPerView: photos_count,
  //         allowTouchMove: false,
  //       }
  //     }
  //   }
  // );
}

function hashPanel() {
  $(".hash-panel").each(function () {
    const
      hashPanel = $(this),
      hashPanelButton = hashPanel.find(".hash-panel__button"),
      hashPanelWrapper = hashPanel.find(".hash-panel__wrapper"),
      hashPanelContainer = hashPanel.find(".hash-panel__container")

    hashPanelButton.on("click", () => {
      hashPanel.toggleClass("hash-panel--active")

      if (hashPanel.hasClass("hash-panel--active")) {
        hashPanelWrapper.css("max-height", hashPanelContainer.height() + "px")
      } else {
        hashPanelWrapper.css("max-height", "")
      }
    })

    $(window).on("resize", () => {
      if (hashPanel.hasClass("hash-panel--active")) {
        hashPanelWrapper.css("max-height", hashPanelContainer.height() + "px")
      }
    })
  });
}

function selectInputs() {
  const selectInputs = $(".select-input__select");

  selectInputs.each(function (index, element) {
    const selectInput = $(element);
    const selectInputOptions = {}

    // search line
    if (selectInput.data("no-search") !== undefined) {
      selectInputOptions.minimumResultsForSearch = -1;
    }

    // width
    selectInputOptions.width = selectInput.data("width");

    // theme
    selectInputOptions.theme = selectInput.data("theme");

    // placeholder
    const selectInputPlaceholder = selectInput.data("placeholder");
    if (selectInputPlaceholder) {
      selectInputOptions.placeholder = selectInputPlaceholder;
    }

    // dropdown place
    const dropdownPlace = selectInput.closest(".select-input");
    selectInputOptions.dropdownParent = dropdownPlace;

    selectInput.select2(selectInputOptions);
  });
}

function sideNav() {
  let
    item,
    itemWrapper,
    itemContent;

  $(".side-nav__item-title").on("click", function () {
    item = $(this).closest(".side-nav__item");

    if (!item.hasClass("side-nav__item--active")) {
      itemWrapper = item.find(".side-nav__item-wrapper");
      itemContent = itemWrapper.find(".side-nav__item-content");

      if (item.hasClass("side-nav__item--open")) {
        itemWrapper.css("max-height", "");
      } else {
        itemWrapper.css("max-height", itemContent.height() + "px");
      }

      item.toggleClass("side-nav__item--open");
    }
  });

  $(window).on("resize", () => {
    $(".side-nav__item--active, .side-nav__item--open").each(function () {
      itemWrapper = $(this).find(".side-nav__item-wrapper");
      itemContent = itemWrapper.find(".side-nav__item-content");

      itemWrapper.css("max-height", itemContent.height() + "px");
    });
  });
}

