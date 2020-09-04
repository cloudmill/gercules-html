import $ from "jquery";
class Builder {
  constructor() {
    this.currentDay = 0;
  }
  createCell(day, event) {
    let html = "";
    if (this.currentDay % 7 == 0) {
      html += "<tr>";
    }
    if (event > 0) {
      html += `<td class="calendar-event js-modal" href="#events">${day}<span>События:</span><span>${event}</span></td>`;
    } else if (event == -1) {
      html += `<td>${day}</td>`;
    } else {
      html += `<td>${day}</td>`;
    }
    if (this.currentDay % 7 == 6) {
      html += "</tr>";
    }
    this.currentDay++;
    return html;
  }
}
export default class Calendar {
  constructor() {
    this.dataEvents = [];
    this.init();
  }
  init() {
    this.builder = new Builder();
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth()+1;
    this.currentDay = date.getDay();
    this.setConst();
    this.setDataEvents();
    this.build();
  }
  build() {
    let start_day = this.getWeekDay(this.currentYear, this.currentMonth, 1);
    let countDays = this.getCount();
    let last_day = this.getWeekDay(
      this.currentYear,
      this.currentMonth,
      countDays
    );
    let table = "";
    if (start_day != 0) {
      let countDays_prev = this.getCount(this.currentMonth + 1);
      for (let i = countDays_prev - start_day; i <= countDays_prev; i++) {
        table += this.builder.createCell(i + 1, -1);
      }
    }

    for (let i = 0; i <= countDays; i++) {
      let event = this.getEvent(i + 1);
      table += this.builder.createCell(i + 1, event);
    }

    if (last_day != 6) {
      for (let i = last_day + 1; i < 6; i++) {
        table += this.builder.createCell(i - last_day, -1);
      }
    }
    $(".events-calendar tbody").html(table);
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
  getWeekDay(year, month, day) {
    let d = new Date(year, month, day - 1).getDay() - 1;
    return d == -1 ? 6 : d;
  }
  getEvent(day) {
    let count = 0;
    this.dataEvents.forEach((el) => {
      if (
        el.day == day &&
        el.year == this.currentYear &&
        el.month == this.currentMonth + 1
      ) {
        count = el.count;
      }
    });
    return count;
  }
  setConst() {
    this.months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  getCount(id) {
    let _id = id != undefined ? id : this.currentMonth;
    if (_id > 11) _id = _id % 11;
    let countDays = this.months[_id];
    if (this.currentMonth == 1) countDays += this.currentYear / 4 == 0 ? 1 : 0;
    return countDays;
  }
}
