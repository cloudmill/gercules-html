import $ from "jquery";
import "select2";

class Validator {
  constructor() {}
  init() {
    let inputs = $(".field").find("input,textarea");
    let that = this;
    inputs.keyup(function () {
      that.checkInputForRight($(this));
    });
    inputs.change(function () {
      that.checkInputForRight($(this));
    });
  }
  error(input) {
    input.closest("label").addClass("error");
    if (window.Config.debug) {
      console.error("field " + input.attr("name") + " invalid");
    }
  }
  validMail(mail) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(mail);
    return valid;
  }
  success(input) {
    input.parent("label").removeClass("error");
    if (window.Config.debug) {
      console.log("field " + input.attr("name") + " valid");
    }
  }
  checkInputForRight(input) {
    let type = input.attr("type");
    if (input.attr("data-required")) {
      if (type == "text") {
        if (input.val() == "") {
          input.removeClass("fill");
        } else {
          input.addClass("fill");
        }
        let name = input.attr("name");
        let val = input.val();
        if (val == "") {
          this.error(input);
        } else {
          if (name.indexOf("mail") != -1 && !this.validMail(val)) {
            this.error(input);
          } else {
            this.success(input);
          }
        }
      } else if (type == "checkbox") {
        if (!input.eq(0)[0].checked) {
          this.error(input);
        } else {
          this.success(input);
        }
      }
    }
  }
  checkFormRight(form) {
    let that = this;
    let fields = form.find(".field");
    fields.each(function () {
      that.checkInputForRight($(this).find("input"));
    });
    if (form.find(".field label.error").length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
let validator = new Validator();

class Form {
  constructor(el) {
    this.form = el;
    this.url = this.form.attr("action");
    this.init();
  }
  init() {
    this.form.submit((e) => {
      e.preventDefault();
      if (validator.checkFormRight(this.form)) {
        if (window.Config.debug) {
          console.log("form valid");
        }
        this.mess();
      } else {
        if (window.Config.debug) {
          console.error("form invalid");
        }
      }
    });
  }
  mess() {
    $.ajax({
      url: this.url,
      method: "get",
      dataType: "html",
      data: this.getData(),
      success: (data) => {
        console.log(data);
        this.onsuccess(data);
        this.clear();
      },
      error: (e) => {
        this.onerror(e);
      },
    });
  }

  getData() {
    let ar = [];
    this.form.find("input,textarea").each((key, item) => {
      let name = $(item).attr("name") || $(item).attr("id");
      ar[name] = $(item).val();
    });
    return ar;
  }

  clear() {
    this.form.find("input,textarea").val("");
  }

  onsuccess(data) {
    ///
  }

  onerror(e) {
    console.error("Ошибка отправки формы", e);
  }
}

export default class Manager_forms {
  constructor() {
    this.init();
  }

  init() {
    this.initSelect2();

    validator.init();

    this.initSertTabsChange();
    this.selectProd();

    this.init_form_calc();
    this.init_form_modal();
    this.init_form_subscribe();
    this.init_form_questionSection();
  }

  initSelect2() {
    $(".field-select select").each((key, select) => {
      $(select).select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $(".selectArea"),
      });
      $(select).on("select2:open", function (e) {
        $(".selectArea").addClass("active");
        var html = $(select)
          .parent()
          .find(".select2-selection__rendered")
          .eq(0)[0].outerHTML;
        $(".select2-dropdown").find(".select2-selection__rendered").remove();
        $(".select2-dropdown").append(html);
        if ($(select).parent().parent().hasClass("field-filter")) {
          $(".select2-dropdown").addClass("select2-filter-view");
        }
        $("html").addClass("closeScroll");
      });
      $(select).on("select2:closing", function (e) {
        $(".selectArea").removeClass("active");
        $("html").removeClass("closeScroll");
      });
    });
    $(document).on(
      "click",
      ".select2-dropdown .select2-selection__rendered",
      function (e) {
        $(".field-select select").select2("close");
      }
    );
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
