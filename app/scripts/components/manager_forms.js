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
      console.log(select)
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

    $(".form-select select").each((index, select) => {
      const selectOptions = {}
      selectOptions.minimumResultsForSearch = -1

      const selectPlaceholder = $(select).data("select-placeholder")
      if (selectPlaceholder) {
        selectOptions.placeholder = selectPlaceholder
      }
      
      $(select).select2(selectOptions)
    })
  }

  init_form_calendar() {
    let calendar = new CalendarSlider();
    let proccess = false;
    const request = async () => {
      if(proccess) return true;
      proccess = true;
      try {
        const sity = $(".events-control select").val();
        let params = "";
        $(".events-control input[type=checkbox]").each((k, item) => {
          const checkName = item.getAttribute("name");
          const value = item.checked;
          params += `&${checkName}=${value}`;
        });
        const dataStr = `sity=${sity}${params}`;
        const responce = await fetch(`/local/templates/s1/include/ajax/academy/listEvents.php?${dataStr}`, {
          headers: {
            "Content-Type": "text/html",
          },
        });
        if (responce.ok) {
          const text = await responce.text();
          
          console.log(text);
          $(".calendar-data-events").html(text);
          calendar.updateDate();
          setTimeout(()=>{
            proccess = false;
          },500)
        }
      } catch (e) {
        console.log(e);
        proccess = false;
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
      const max = parseInt($(item).attr("data-slider-max"));
      const min = parseInt($(item).attr("data-slider-min"));
      const slider = $(item)
        .slider()
        .on("slide", () => {
          inpt.val(slider.getValue());
          recalc();
        })
        .data("slider");
      inpt.keyup((e) => {
        const val = e.target.value.replace(/[^0-9+.,]/g, "");
        inpt.val(val);
        if (val > max) inpt.val(max);
        if (val < min) inpt.val(min);
        slider.setValue(e.target.value);
        recalc();
      });
    });
    $(".card-calculator select").change(() => {
      recalc();
    });
  }
}
