let { Builder } = require("./builder");

class Calendar {
  constructor() {
    this.dataEvents = [];
    this.months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    this.init();
  }
  init() {
    this.setDataEvents();
    this.builder = new Builder(this.dataEvents);
  }
  update() {
    this.dataEvents = [];
    this.setDataEvents();
    this.builder.update(this.dataEvents);
  }
  build(year, monthId) {
    return `<table data-month=${monthId}>${this.builder.drawMonth(
      monthId,
      year
    )}</table>`;
  }

  setDataEvents() {
    document.querySelectorAll(".calendar-data-events input").forEach((item,key) => {
      this.dataEvents.push({
        year: item.getAttribute("data-year"),
        month: item.getAttribute("data-month"),
        day: item.getAttribute("data-day"),
        count: item.getAttribute("data-count"),
      });
    });
  }
}

exports.Calendar = Calendar;