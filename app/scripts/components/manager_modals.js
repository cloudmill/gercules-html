import $ from "jquery";
import Modal from "./modals/modal";

export default class Manager_modals {
  constructor() {
    this.init();
  }
  init() {
    this.modals = {};
    this.opened = null;
    $(document)
      .find(".modal-item")
      .each((key, item) => {
        let id = item.getAttribute("id");
        this.modals[id] = new Modal(item);
      });

    $(document).on("click", ".js-modal", (e) => {
      e.preventDefault();
      let id = e.currentTarget.getAttribute("href").replace("#", "");
      if ($(e.currentTarget).is("[await]")) {
        const url = $(e.currentTarget).attr("await");
        const request = async () => {
          const responce = await fetch(url, {
            headers: {
              "Content-Type": "text/html",
            },
          });
          let content = `<div class="modal-title">Ошибка загрузки данных</div>`;
          console.log(responce);
          if (responce.ok) {
            content = await responce.json();
          }
          this.modals[id].html(content);
          this.openModal(id);
        };
        request();
      } else {
        this.openModal(id);
      }
    });
    $("[data-modal-close]").click(() => {
      this.close();
    });
    $("body").mousedown((e) => {
      if (this.opened) {
        var container = $(document).find(".modal-item, .select2-container");
        if (container.has(e.target).length === 0) {
          this.close();
        }
      }
    });
  }
  async openModal(id) {
    $("html").addClass("closeScroll");
    try {
      if (this.opened) {
        if (this.opened.id == id) return true;
        await this.opened.close();
      } else {
        $(".modal").addClass("active");
      }
      await this.modals[id].open();
      this.opened = this.modals[id];
      if (window.CONFIG.gebug) write.good(`Модальное ${id} окно открыто`);
    } catch (e) {
      write.error(`${e}\nОшибка открытия модального окна: ${id}`);
    }
  }
  async close() {
    try {
      await this.opened.close();
      this.opened = null;
      $(".modal").removeClass("active");
      $("html").removeClass("closeScroll");
    } catch {
      write.error(`${e}\nОшибка закрытия модального окна`);
    }
  }
}
