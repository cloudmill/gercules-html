import $ from "jquery";
export default class Validator {
  constructor() {
    this.init();
  }
  init() {
    let inputs = $(".field").find("input,textarea");
    inputs.keyup((e) => {
      this.checkInput($(e.target));
    });
    inputs.change((e) => {
      this.checkInput($(e.target));
    });
  }

  error(input) {
    this.getLabel(input).addClass("error");
    if (window.CONFIG.debug) write.warn(`field ${input.attr("name")} invalid`);
  }

  success(input) {
    this.getLabel(input).removeClass("error");
    if (window.CONFIG.debug) write.good(`field ${input.attr("name")} valid`);
  }
  checkInput(input) {
    let type = input.attr("type");
    let name = input.attr("name");
    if (input.is("[data-required]")) {
      switch (type) {
        case "text": {
          let val = input.val();
          if (val == "") {
            input.removeClass("fill");
            this.error(input);
          } else {
            input.addClass("fill");
            if (name.indexOf("mail") != -1 && !this.validMail(val)) {
              this.error(input);
            } else {
              this.success(input);
            }
          }
          break;
        }
        case "checkbox": {
          if (!input.eq(0)[0].checked) {
            this.error(input);
          } else {
            this.success(input);
          }
          break;
        }
      }
    }
  }
  checkForm(form) {
    if (window.CONFIG.debug) write.br();
    let fields = form.find(".field");
    fields.each((k, item) => {
      this.checkInput($(item).find("input"));
    });
    if (window.CONFIG.debug) write.br();
    if (form.find(".field label.error").length == 0) {
      return true;
    } else {
      return false;
    }
  }
  getLabel(input) {
    if (input.closest("label").length > 0) return input.closest("label");
    else return input.closest(".field").find("label");
  }
  validMail(mail) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(mail);
    return valid;
  }
}
