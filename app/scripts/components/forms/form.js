import $ from "jquery";

export default class Form {
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
