import $ from "jquery";
import Modal from "./modals/modal";

export default class Manager_modals {
  constructor() {
    this.init();
  }
  init() {
    this.modals = [];
    this.count = 0;
    this.state = "close";
    var that = this;
    $(document)
      .find(".modal-item")
      .each((key, item) => {
        let id = item.getAttribute("id");
        this.modals[id] = new Modal(item);
        this.count++;
      });

    $(document).on("click", ".js-modal", function (e) {
      e.preventDefault();
      let id = $(this).attr("href").replace("#", "");
      that.openModal(id);
    });
    $("[data-modal-close]").click(() => {
      this.close();

    });
    $("body").mouseup((e) => {
      if (this.state == "open") {
        var container = $(document).find(".modal-item > *, .select2-container");
        if (container.has(e.target).length === 0) {
          this.close();
        }
      }
    });
  }
  openModal(id) {
    $("html").addClass("closeScroll");
    if (this.state == "close") {
      $(".modal").addClass("active");
      this.modals[id].open(() => {
        this.state = "open";
      });
    } else {
      for (let key in this.modals) {
        let item = this.modals[key];
        if (item.state == "open") {
          item.close();
        }
      }
      this.modals[id].open(() => {
        this.state = "open";
      });
    }
  }
  close() {
    let i = 0;
    for (let key in this.modals) {
      let item = this.modals[key];
      if (item.state == "open")
        item.close(() => {
          i++;
          if (i == this.count) {
            this.state = "close";
            $(".modal").removeClass("active");
            $("html").removeClass("closeScroll");
          }
        });
      else {
        i++;
        if (i == this.count) {
          this.state = "close";
          $(".modal").removeClass("active");
          $("html").removeClass("closeScroll");
        }
      }
    }
  }
}
