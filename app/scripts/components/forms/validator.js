export default class Validator {
  constructor() {
    this.init()
  }
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
