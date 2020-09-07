import Builder from "./calendar/builder";
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
    $(".calendar-data-events input").each((key, item) => {
      this.dataEvents.push({
        year: item.getAttribute("data-year"),
        month: item.getAttribute("data-month"),
        day: item.getAttribute("data-day"),
        count: item.getAttribute("data-count"),
      });
    });
  }
}

export default class CalendarSlider {
  constructor() {
    this.maxSlides = 5;
    this.deph = (this.maxSlides - 1) / 2;
    this.calendar = new Calendar();
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonthId = date.getMonth();

    this.events();
    this.init();
  }
  init() {
    this.sliderContent = "";
    this.eachForMonthSlider((year, monthid) => {
      this.sliderContent += this.calendar.build(year, monthid);
    });
    $(".events-calendar-slider").html(this.sliderContent);
    this.update();
  }
  preDraw(type) {
    if (type < 0) {
      let month1 = this.currentMonthId + this.deph + 1;
      month1 = this.correctMonth(month1);
      $(document).find(`table[data-month="${month1}"]`).remove();

      let month2 = this.currentMonthId - this.deph;
      let _year = this.currentYear + (month2 < 0 ? -1 : month2 > 11 ? 1 : 0);
      month2 = this.correctMonth(month2);
      let table = this.calendar.build(_year, month2);
      $(".events-calendar-slider").prepend(table)
    }
    if (type > 0) {
      let month1 = this.currentMonthId - this.deph - 1;
      month1 = this.correctMonth(month1);
      $(document).find(`table[data-month="${month1}"]`).remove();

      let month2 = this.currentMonthId + this.deph;
      let _year = this.currentYear + (month2 < 0 ? -1 : month2 > 11 ? 1 : 0);
      month2 = this.correctMonth(month2);
      let table = this.calendar.build(_year, month2);
      $(".events-calendar-slider").append(table)
    }
  }
  setClasses() {
    this.eachForMonthSlider((year, monthid, d) => {
      let slide = $(document).find(`table[data-month="${monthid}"]`);
      slide.removeClass("prev").removeClass("next").removeClass("active");
      if (d < 0) slide.addClass("prev");
      if (d > 0) slide.addClass("next");
      if (d == 0) slide.addClass("active");
    });
  }
  events() {
    $(".events-control .date-prev").click(() => {
      this.prev();
    });
    $(".events-control .date-next").click(() => {
      this.next();
    });
  }
  next() {
    this.currentMonthId++;
    if (this.currentMonthId > 11) {
      this.currentYear++;
      this.currentMonthId = 0;
    }
    this.update(1);
  }
  prev() {
    this.currentMonthId--;
    if (this.currentMonthId < 0) {
      this.currentYear--;
      this.currentMonthId = 11;
    }
    this.update(-1);
  }
  update(type) {
    this.preDraw(type);
    this.setClasses();
    $(".control-date span").html(
      `${this.months[this.currentMonthId]} ${this.currentYear}`
    );
  }
  updateDate() {
    this.calendar.update();
  }
  eachForMonthSlider(handler) {
    let deph = this.deph;
    for (let month = -deph; month <= deph; month++) {
      let _month = this.currentMonthId + month;
      let _year = this.currentYear + (_month < 0 ? -1 : _month > 11 ? 1 : 0);
      _month = this.correctMonth(_month);
      handler(_year, _month, month);
    }
  }
  correctMonth(_month) {
    return _month < 0 ? 12 - _month : _month > 11 ? _month - 12 : _month;
  }
}
