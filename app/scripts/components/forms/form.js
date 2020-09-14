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
      if (window.VALIDATOR.checkForm(this.form)) {
        if (window.CONFIG.debug) write.good("form valid");
        this.mess();
      } else {
        if (window.CONFIG.debug) write.warn("form invalid");
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
        if (window.CONFIG.debug) write.log(data);
        this.onsuccess(data);
        this.clear();
      },
      error: (e) => {
        this.onerror(e);
      },
    });
  }

  getData() {
    let ar = {};
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
