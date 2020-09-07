import $ from "jquery";
import "select2";

import Validator from "./forms/validator";
import Form from "./forms/form";
import CalendarSlider from "./forms/calendar";

window.validator = new Validator();

export default class Manager_forms {
  constructor() {
    this.init();
  }

  init() {
    this.initSelect2();
    validator.init();

    //this.init_form_modal();
    //this.init_form_subscribe();
    this.init_form_calendar();
  }

  initSelect2() {
    $(".field-select select").each((key, select) => {
      if ($(select).attr("data-select-placeholder")) {
        $(select).select2({
          minimumResultsForSearch: -1,
          placeholder: $(select).attr("data-select-placeholder")
        })
      } else {
        $(select).select2({
          minimumResultsForSearch: -1,
        })
      }
    });
  }

  init_form_calendar(){
    let calendar = new CalendarSlider();
    console.log(calendar.calendar)
  }

  init_form_modal() {
    let form = new Form($("#question form"));
    form.onsuccess = function () {
      $(this).find(".modal-form-step").removeClass("active");
      $(this).find('.modal-form-step[data-step="2"]').addClass("active");
    };

    $(".modal-form-reset a").click(function (e) {
      e.preventDefault();
      $("#question form").find(".modal-form-step").removeClass("active");
      $("#question form")
        .find('.modal-form-step[data-step="1"]')
        .addClass("active");
    });
  }

  init_form_subscribe() {
    let form = new Form($("#subscribe form"));
    form.onsuccess = function () {
      $("#subscribe .subscribe-success").addClass("active");
    };

    $("#subscribe .subscribe-success-reset a").click(function (e) {
      e.preventDefault();
      $("#subscribe .subscribe-success").removeClass("active");
    });
  }
}
