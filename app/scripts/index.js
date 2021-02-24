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

  wherebuyPage();

  comparePage();

  tags();

  sliderNew();
  publicationPage();

  selectTag();

  modal();

  academyPage();

  videoBtn();
});

function academyPage() {
  $('#submit').on('click', event => {
    const scrollBarWidth = getScrollBarWidth($(document.documentElement));

    if (scrollBarWidth) {
      $('.wrapper').css('padding-right', scrollBarWidth + 'px');
    }
    $(document.documentElement).css('overflow', 'hidden');
    
    $('.modal-publication-msg').removeClass('modal-publication-msg--hide');
    $('.b-modal').removeClass('b-modal--hide');
  });
}

function selectTag() {
  $('.select-tag').each(function () {
    const component = $(this);
    const openBtn = $(this).find('.select-tag__open');
    const tags = [];

    $(this).find('.select-tag__list--active').find('.select-tag__tag').each(function () {
      if ($(this).hasClass('select-tag__tag--active')) {
        tags.push(true);
      } else {
        tags.push(false);
      }
    });

    openBtn.on('click', (event) => {
      $(event.currentTarget).toggleClass('select-tag__open--active');
      
      const activeBtnText = $(event.currentTarget).find('.select-tag__open-text--active');
      $(event.currentTarget).find('.select-tag__open-text').addClass('select-tag__open-text--active')
      activeBtnText.removeClass('select-tag__open-text--active');

      const activeList = $(this).find('.select-tag__list--active');

      $(this).find('.select-tag__list').addClass('select-tag__list--active');
      activeList.removeClass('select-tag__list--active');

      $(this).find('.select-tag__list--active').find('.select-tag__item').each(function () {
        if ($(this).find('.select-tag__tag')) {
          if (tags[$(this).index()]) {
            $(this).find('.select-tag__tag').addClass('select-tag__tag--active');
          } else {
            $(this).find('.select-tag__tag').removeClass('select-tag__tag--active');
          }
        }
      });

      openUpdate();
    });

    $(this).find('.select-tag__item').on('click', function () {
      const tag = $(this).find('.select-tag__tag');

      if (tag) {
        tags[$(this).index()] = !tags[$(this).index()];

        tag.toggleClass('select-tag__tag--active');
      }

      resetUpdate();
    });

    $(this).find('.select-tag__reset').on('click', () => {
      $(this).find('.select-tag__tag').removeClass('select-tag__tag--active');
      
      for (let i = 0; i < tags.length; i++) {
        tags[i] = false;
      }
    });

    resetUpdate();

    openUpdate();

    $(window).on('resize', () => {
      openUpdate();
    });
    
    function resetUpdate() {
      if (component.find('.select-tag__list--active').find('.select-tag__tag--active').length) {
        component.find('.select-tag__reset').closest('.select-tag__item').removeClass('select-tag__item--removed');
      } else {
        component.find('.select-tag__reset').closest('.select-tag__item').addClass('select-tag__item--removed');
      }
    }

    function openUpdate() {
      const activeList = component.find('.select-tag__list--active');
      const firstItem = activeList.find('.select-tag__item').filter(':first');
      const firstItemTop = firstItem.position().top;

      let countInvisibleItems = 0;
      activeList.find('.select-tag__item').each(function () {
        const currentItemTop = $(this).position().top;

        if (currentItemTop > firstItemTop + 5) {
          countInvisibleItems++;
        }
      });

      if (!component.find('.select-tag__item--removed').length) {
        countInvisibleItems--;
      }

      if (countInvisibleItems > 0) {
        component.find('.select-tag__open').removeClass('select-tag__open--disabled');

        component.find('.select-tag__open-count').text(countInvisibleItems);
      } else {
        component.find('.select-tag__open').addClass('select-tag__open--disabled');
      }
    }
  });

  var tegActive = [];

  $('.select-tag__item').on('click', function(){

    $('.select-tag__list--active').find('.select-tag__tag').each(function (){
      if ($(this).hasClass('select-tag__tag--active')){
        tegActive.push(true);
      }
      else{
        tegActive.push(false);
      }
    });

    let i = 0;

    $('.teg-mob').find('.teg-mob__hashtag').each(function() {
      
      if (tegActive[i] == true){
        $(this).addClass('teg-mob__hashtag--active-red');
      }else{
        $(this).removeClass('teg-mob__hashtag--active-red');
      }
      i++;
    });

    tegActive =[];
    i = 0;

  });
}

function publicationPage() {

  // modal

  // open modal

  $('.publications-detail__save').on('click', event => {
    const scrollBarWidth = getScrollBarWidth($(document.documentElement));

    if (scrollBarWidth) {
      $('.wrapper').css('padding-right', scrollBarWidth + 'px');
    }
    $(document.documentElement).css('overflow', 'hidden');
    
    $('.modal-subscription').removeClass('modal-subscription--hide');
    $('.b-modal').removeClass('b-modal--hide');

    if ($(window).width() > 992) {
      $('.publications-subscription--modal-subscription').scrollTop(0);
    }
  });

  // close modal

  $('.modal-subscription').on('click', event => {
    if (
      event.target.classList.contains('modal-subscription')
      || event.target.classList.contains('modal-subscription__close')
    ) {
      $(document.documentElement).css('overflow', '');
      $('.wrapper').css('padding-right', '');
      
      $('.modal-subscription').addClass('modal-subscription--hide');
      $('.b-modal').addClass('b-modal--hide');
    }
  });

  $(window).on('resize', () => {
    if ($(window).width() > 992) {
      $('.publications-subscription--modal-subscription').scrollTop(0);
    }
  });

  $('.modal-subscription [type="submit"]').on('click', () => {
    $('.modal-subscription').addClass('modal-subscription--hide');
    $('.modal-publication-msg').removeClass('modal-publication-msg--hide');
  });

  $('.modal-publication-msg').on('click', event => {
    if (
      event.target.classList.contains('modal-publication-msg')
      || event.target.classList.contains('modal-publication-msg__close')
    ) {
      $(document.documentElement).css('overflow', '');
      $('.wrapper').css('padding-right', '');
      
      $('.modal-publication-msg').addClass('modal-publication-msg--hide');
      $('.b-modal').addClass('b-modal--hide');
    }
  });
}

function comparePage() {
  
  // ВЫРАВНИВАНИЕ ТАБЛИЦЫ

  function table_align() {
    const
      TABLE_CLASS = 'compare__wrapper',
      HEAD_CLASS = 'compare__head',
      COLUMN_CLASS = 'swiper-slide',
      ROW_CLASS = 'compare__item';

    // для каждой таблицы в отдельности

    $('.' + TABLE_CLASS).each(function () {

      // сброc предыдущего выравнивания

      $('.' + ROW_CLASS).css('height', '');
      
      // вычисляем максимальные высоты строк
      
      const row_height = [];
      
      $(this).find('.' + HEAD_CLASS).find('.' + ROW_CLASS).each(function () {
        row_height[$(this).index()] = $(this).height();
      });

      $(this).find('.' + COLUMN_CLASS).each(function () {
        $(this).find('.' + ROW_CLASS).each(function () {
          const
            cur_row_index = $(this).index(),
            cur_row_height = $(this).height();

          if (cur_row_height > row_height[cur_row_index]) {
            row_height[cur_row_index] = cur_row_height;
          }
        });
      });

      // задаем всем строкам их максимальную высоту (выравниваем таблицу)

      $(this).find('.' + HEAD_CLASS).find('.' + ROW_CLASS).each(function () {
        $(this).height(row_height[$(this).index()]);
      });

      $(this).find('.' + COLUMN_CLASS).each(function () {
        $(this).find('.' + ROW_CLASS).each(function () {
          $(this).height(row_height[$(this).index()]);
        });
      });
    });
  }

  // УДАЛЕНИЕ ИЗ ТАБЛИЦЫ

  $('.compare__delete').on('click', function () {
    const
      table = $(this).closest('.compare__wrapper'),
      tableIndex = $(this).closest('.compare__wrapper').index(),
      slideIndex = $(this).closest('.swiper-slide').index(),
      slideCount = sliders[tableIndex].slides.length;

    if (slideCount > 1) {
      sliders[tableIndex].removeSlide(slideIndex);

      if ((slideCount - 1) < 4) {
        sliders[tableIndex].params.slidesPerView = slideCount - 1;
        sliders[tableIndex].update();
      }

      if (slideCount === 2) {
        table.find('.compare__delete').addClass('compare__delete--disabled');
      }
    }
  });

  // ИНИЦИАЛИЗАЦИЯ ТАБЛИЦ

  const sliders = [];

  $('.compare__wrapper').each(function () {
    const
      slider = $(this).find('.swiper-container')[0],
      prev_button = $(this).find('.compare__control--prev')[0],
      next_button = $(this).find('.compare__control--next')[0];

    sliders.push(new Swiper(slider, {
      slidesPerView: 4,
      allowTouchMove: false,
      navigation: {
        prevEl: prev_button,
        nextEl: next_button,
      },
      on: {
        init: table_align,
        resize: table_align,
      },
    }));
  });
}

function wherebuyPage() {
  if ($('.wherebuy').length) {
    const options = {
      theme: 'wherebuy',
      width: '100%',
      minimumResultsForSearch: Infinity,
    };
    $('.wherebuy__filter-select').each(function () {
      const placeholder = $(this).data('placeholder');
      if (placeholder) {
        options.placeholder = placeholder;
      }
      $(this).select2(options);
    });
  }
}

function videosPage() {
  
  // filter

  const
    FILTER_WRAPPER_CLASS = 'videos__filter',
    FILTER_RESET_CLASS = 'videos__filter-button',
    FILTER_SELECT_CLASS = 'videos__filter-select';

  $('.' + FILTER_WRAPPER_CLASS).find('select').select2({
    theme: 'my-theme',
    width: '100%',
    minimumResultsForSearch: Infinity,
  });

  $('.' + FILTER_RESET_CLASS).on('click', () => {
    setTimeout(() => {
      $('.' + FILTER_SELECT_CLASS).trigger('change');
    }, 0);
  });


  // modal

  $(document).on("click", ".videos__item-content", function (e) {
    const scrollBarWidth = getScrollBarWidth($(document.documentElement));

    if (scrollBarWidth) {
      $('.wrapper').css('padding-right', scrollBarWidth + 'px');
    }
    $(document.documentElement).css('overflow', 'hidden');
    
    $('.modal-video').removeClass('modal-video--hide');
    $('.b-modal').removeClass('b-modal--hide');
  });

  $('.modal-video').on('click', event => {
    if (
      event.target.classList.contains('modal-video')
      || event.target.classList.contains('modal-video__close')
    ) {
      $(document.documentElement).css('overflow', '');
      $('.wrapper').css('padding-right', '');
      
      $('.modal-video').addClass('modal-video--hide');
      $('.b-modal').addClass('b-modal--hide');
    }
  });
}

function getScrollBarWidth(element) {
  let scrollBarWidth = -element.width();
  element.css('overflow', 'hidden');
  scrollBarWidth += element.width();
  element.css('overflow', '');
  return scrollBarWidth;
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


function tags() {
  $('.teg__hashtag').on('click', function(){
    $(this).toggleClass('teg__hashtag--active');

    if ($('.teg__hashtag').hasClass('teg__hashtag--active')){
      $('.teg__hashtag-remove').addClass('teg__hashtag-remove--active');
    }else{
      $('.teg__hashtag-remove').removeClass('teg__hashtag-remove--active');
    }
  });

  $('.teg__hashtag-remove').on('click', function(){
    $('.teg__hashtag').removeClass('teg__hashtag--active');
    $('.teg__hashtag-remove').removeClass('teg__hashtag-remove--active');
  });

  $('.teg__col--still').on('click', function(){

    $(this).toggleClass('teg__col--still-active');

    $('.teg__hashtag-additional').toggleClass('teg__hashtag-additional--active');

    if ($('.teg__deploy').hasClass('teg-active')){
      $('.teg__deploy').removeClass('teg-active');
      $('.teg__up').addClass('teg-active');
    }else{
      $('.teg__up').removeClass('teg-active');
      $('.teg__deploy').addClass('teg-active');
    }

  });

  $('.teg-mob__hashtag').on('click', function(){
    $(this).toggleClass('teg-mob__hashtag--active-red');

    if ($('.teg-mob__hashtag').hasClass('teg-mob__hashtag--active-red')){
      $('.teg-mob__hashtag-remove').addClass('teg-mob__hashtag-remove--active');
      $('.teg-mob__col--topics').css('display','none');
    }else{
      $('.teg-mob__hashtag-remove').removeClass('teg-mob__hashtag-remove--active');
      $('.teg-mob__col--topics').css('display','block');
    }

  });

  $('.teg-mob__hashtag-remove').on('click', function(){
    $('.teg-mob__hashtag').removeClass('teg-mob__hashtag--active-red');
    $('.teg-mob__hashtag-remove').removeClass('teg-mob__hashtag-remove--active');
    $('.teg-mob__col--topics').css('display','block');
  });

  $('.teg-mob__col--still').on('click', function(){

    $(this).toggleClass('teg-mob__col--still-active');

    $('.teg-mob__hashtag').toggleClass('teg-mob__hashtag--active');

    if ($('.teg-mob__deploy').hasClass('teg-mob-active')){
      $('.teg-mob__deploy').removeClass('teg-mob-active');
      $('.teg-mob__up').addClass('teg-mob-active');
      $('.teg-mob__col--tegs').css('display', 'flex');
    }else{
      $('.teg-mob__up').removeClass('teg-mob-active');
      $('.teg-mob__deploy').addClass('teg-mob-active');
      $('.teg-mob__hashtag-remove').removeClass('teg-mob__hashtag-remove--active');
      $('.teg-mob__col--tegs').css('display', 'block');
    }

  });
}

function sliderNew() {
  var galleryThumbs = new Swiper('.new__gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.new__gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.fs-steps_control-next',
      prevEl: '.fs-steps_control-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });
}

function videoBtn() {
  $('.modal-video__video-button').on('click', function(event){
    $(this).find('modal-video__video-button').toggleClass('modal-video__video-button--hide');
    console.log($(event.target));
    $(this).parent('.videos').find('iframe').trigger('click');
    console.log($(this).parent('.videos').find('iframe'));
  });
}

function modal() {

  $(".js--modal").on("click", function () {

    event.preventDefault();

    $(".modal-vacancy").addClass("active");
    
  });

  $(document).on('keydown',function(event){
    if ( event.keyCode == 27 ) { 
      $(".modal-vacancy").removeClass("active");
    };
  });

  $(".js--modal-close").on("click", function () {

    event.preventDefault();

    $(".modal-vacancy").removeClass("active");

  });
}
