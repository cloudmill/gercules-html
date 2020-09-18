class Builder {
  constructor(dataEvents) {
    this.dataEvents = dataEvents;
    this.currentDay = 0;
  }
  drawMonth(monthId, year) {
    this.currentDay = 0;
    let table = "";
    let start_day = this.getWeekDay(year, monthId, 1);
    let counts = this.getCountsDays(monthId);
    let last_day = this.getWeekDay(year, monthId, counts);

    if (start_day > 0) {
      let prevDays = this.getCountsDays(monthId - 1);
      for (let dayId = prevDays - start_day; dayId < prevDays; dayId++) {
        table += this.drawDay(dayId, -1);
      }
    }

    for (let dayId = 0; dayId < counts; dayId++) {
      let event = this.getEvent(year, monthId, dayId);
      table += this.drawDay(dayId, event);
    }

    if (last_day < 6) {
      for (let dayId = last_day; dayId < 6; dayId++) {
        table += this.drawDay(dayId - last_day, -1);
      }
    }

    return table;
  }
  drawDay(dayId, event) {
    let html = "";
    let day = dayId + 1;
    if (this.currentDay % 7 == 0) {
      html += "<tr>";
    }
    if (event > 0) {
      html += `<td class="calendar-event js-modal" href="#events">${day}<span>События:</span><span>${event}</span></td>`;
    } else if (event == -1) {
      html += `<td class="calendar-disabled">${day}</td>`;
    } else {
      html += `<td>${day}</td>`;
    }
    if (this.currentDay % 7 == 6) {
      html += "</tr>";
    }
    this.currentDay++;
    return html;
  }
  update(dataEvents){
    this.dataEvents = dataEvents;
  }
  getWeekDay(year, monthId, day) {
    let d = new Date(year, monthId, day - 1).getDay();
    return d;
  }
  getCountsDays(monthId, year) {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (monthId > 11) monthId = monthId % 11;
    if (monthId < 0) monthId = 11;
    let countDays = months[monthId];
    if (monthId == 1) countDays += year % 4 == 0 ? 1 : 0;
    return countDays;
  }
  getEvent(year, monthId, dayId) {
    let count = 0;
    let day = dayId + 1;
    let month = monthId + 1;
    this.dataEvents.forEach((el) => {
      if (el.day == day && el.year == year && el.month == month) {
        count = el.count;
      }
    });
    return count;
  }
}
exports.Builder = Builder;
