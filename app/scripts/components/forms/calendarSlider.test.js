let { CalendarSlider } = require("./calendarSlider");

let calendar = new CalendarSlider({});
test('get year', () => {
  expect(calendar.yearMod(-1)).toBe(2020);
  expect(calendar.yearMod(-9)).toBe(2019);
  expect(calendar.yearMod(4)).toBe(2021);
});
test('get month', () => {
  expect(calendar.monthMod(0)).toBe(8);
  expect(calendar.monthMod(-1)).toBe(7);
  expect(calendar.monthMod(-9)).toBe(11);
  expect(calendar.monthMod(4)).toBe(0);
});
