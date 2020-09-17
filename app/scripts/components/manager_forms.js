import $ from "jquery";
import "select2";
import Inputmask from "inputmask";

import Validator from "./forms/validator";
import Form from "./forms/form";

let { CalendarSlider } = require("./forms/calendarSlider");

window.VALIDATOR = new Validator();

export default class Manager_forms {
  constructor() {
    this.init();
  }

  init() {
    this.initSelect2();
    this.initPhones();
    VALIDATOR.init();

    this.init_form_questionBigForm();
    this.init_form_registrationEventForm();
    this.init_form_market();
    this.init_form_calendar();
  }
  initPhones() {
    var im = new Inputmask("+7 (999) 999-99-99");
    im.mask('input[name*="phone"],input[name*="Phone"]');
  }
  initSelect2() {
    $(".field-select select").each((key, select) => {
      if ($(select).attr("data-select-placeholder")) {
        $(select).select2({
          minimumResultsForSearch: -1,
          placeholder: $(select).attr("data-select-placeholder"),
        });
      } else {
        $(select).select2({
          minimumResultsForSearch: -1,
        });
      }
    });
  }

  init_form_calendar() {
    let calendar = new CalendarSlider();
    $(".events-control select").change((e) => {
      let select = e.target;
      calendar.updateDate();
    });
    $(".events-control input").change((e) => {
      let checkbox = e.target;
      calendar.updateDate();
    });
  }

  init_form_questionBigForm() {
    let form = new Form($("#questionBigForm form"));
    form.onsuccess = function () {};
  }
  init_form_registrationEventForm() {
    let form = new Form($("#registrationEventForm form"));
    form.onsuccess = function () {};
  }
  init_form_market() {
    let form = new Form($("#market form"));
    form.onsuccess = function () {};
  }
}