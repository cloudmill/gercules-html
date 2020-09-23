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
    $(".events-control select").change((e) => {
      let select = e.currentTarget;
      const request = async () => {
        try {
          const responce = await fetch("/ajax/getListEvents.php", {
            method: "POST",
            body: JSON.stringify({ data: $(select).val() }),
            headers: {
              "Content-Type": "text/html",
            },
          });

          if (responce.ok) {
            console.log(responce.text());
            $(".calendar-data-events").html(responce.text());
            calendar.updateDate();
          }
        } catch (e) {
          console.log(e);
        }
      };
      request();
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
  init_form_calc() {
    const Pl = 1000; //плотность материала кг/м3
    var massEl = $(".card-product_calculator-result span:first-child");
    var countEl = $(".card-product_calculator-result span:last-child");
    var squareEl = $("[name=productCalculator_area]");
    var thickEl = $("[name=productCalculator_thick]");
    var countEl = $(".card-product_calculator-result span:last-child");
    let mass = 0;
    let count = 0;
    const recalc = () => {
      const size = $(".card-product_calculator select").val();
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
    $(".card-product_calculator select").change(()=>{
      recalc();
    })
  }
}
