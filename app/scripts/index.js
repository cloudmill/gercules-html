import $ from "jquery";
import "select2";

import App from "./main.js";

// modules
import "./components/SelectTags.js";

$(document).ready(function () {
  let app = new App();
  window.app = app;

  selectInputs();

  sideNav();

  hashPanel();
});

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

