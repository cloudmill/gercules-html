
let { Calendar } = require("./calendar/calendar");
let $ = require("jquery");

class CalendarSlider {
  constructor() {
    this.maxSlides = 5;
    this.deph = (this.maxSlides - 1) / 2;
    this.calendar = new Calendar();
    let date = new Date();
    this.absMonth = date.getFullYear() * 12 + date.getMonth();
    this.absMonthMin = this.absMonth - 1;
    this.absMonthMax = this.absMonth + 48;
    this.events();
    this.init();
  }
  get year() {
    return parseInt(this.absMonth / 12);
  }
  get month() {
    return this.absMonth % 12;
  }
  yearMod(d) {
    return parseInt((this.absMonth + d) / 12);
  }
  monthMod(d) {
    return parseInt((this.absMonth + d) % 12);
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
    if(type){
      let month1 = this.monthMod(-(this.deph + 1) * type);
      $(document).find(`table[data-month="${month1}"]`).remove();
  
      let month2 = this.monthMod(this.deph * type);
      let _year = this.yearMod(this.deph * type);
      let table = this.calendar.build(_year, month2);
      $(".events-calendar-slider").prepend(table);
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
    $(".events-calendar-slider").height(
      $(document).find(`table.active[data-month]`).height()
    );
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
    if (this.absMonth + 1 > this.absMonthMax) return false;
    this.absMonth++;
    this.update(1);
  }
  prev() {
    if (this.absMonth - 1 < this.absMonthMin) return false;
    this.absMonth--;
    this.update(-1);
  }
  update(type) {
    this.preDraw(type);
    this.setClasses();
    $(".control-date span").html(
      `${this.calendar.months[this.month]} ${this.year}`
    );
  }
  updateDate() {
    this.calendar.update();
    this.init();
  }
  eachForMonthSlider(handler) {
    let deph = this.deph;
    for (let month = -deph; month <= deph; month++) {
      let _month = this.monthMod(month);
      let _year = this.yearMod(month);
      handler(_year, _month, month);
    }
  }
}

exports.CalendarSlider = CalendarSlider;