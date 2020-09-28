import $ from "jquery";
import "select2";
import "bootstrap-slider";
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
    this.init_form_calc();
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
    const request = async () => {
      try {
        const data = {
          sity: $(".events-control select").val(),
          online: $(".events-control input").is(":checked"),
        };
        const responce = await fetch("/ajax/getListEvents.php", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "text/html",
          },
        });

        if (responce.ok) {
          const text = await responce.text()
          console.log(text);
          $(".calendar-data-events").html(text);
          calendar.updateDate();
        }
      } catch (e) {
        console.log(e);
      }
    };
    $(".events-control select").change((e) => {
      request();
    });
    $(".events-control input").change((e) => {
      request();
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
  init_form_calc() {
    const Pl = 1000; //плотность материала кг/м3
    var massEl = $(".card-calculator_result span:first-child");
    var countEl = $(".card-calculator_result span:last-child");
    var squareEl = $("[name=productCalculator_area]");
    var thickEl = $("[name=productCalculator_thick]");
    var countEl = $(".card-calculator_result span:last-child");
    let mass = 0;
    let count = 0;
    const recalc = () => {
      const size = $(".card-calculator select").val();
      const square = squareEl.val();
      const thick = thickEl.val();
      mass = (thick / 1000) * square * Pl;
      count = mass / size;
      massEl.html(`${parseInt(mass)} кг`);
      countEl.html(`${parseInt(count)} мешков`);
    };
    $(".field-base .sliderRange").each((key, item) => {
      const inpt = $(item)
        .closest(".field-base")
        .find("input:not(.sliderRange)");
      const slider = $(item)
        .slider()
        .on("slide", () => {
          inpt.val(slider.getValue());
          recalc();
        })
        .data("slider");
    });
    $(".card-calculator select").change(() => {
      recalc();
    });
  }
}
