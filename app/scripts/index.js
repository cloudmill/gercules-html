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