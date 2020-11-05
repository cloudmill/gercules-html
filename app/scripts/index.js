import $ from "jquery";
import App from "./main.js";

// NEW
import "select2";
// END NEW

$(document).ready(function () {
  let app = new App();
  window.app = app;

  // NEW
  selectInputs();
  // END NEW

  sideNav();
});

// NEW
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
// END NEW

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