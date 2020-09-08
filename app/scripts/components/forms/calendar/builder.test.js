let {Builder} = require('./builder');


let builder = new Builder({});
test('getCountsDays', () => {
  expect(builder.getCountsDays(1, 2020)).toBe(29);
  expect(builder.getCountsDays(1, 2021)).toBe(28);
  expect(builder.getCountsDays(8, 2021)).toBe(30);
  expect(builder.getCountsDays(9, 2021)).toBe(31);
});

test('getWeekDay', () => {
  expect(builder.getWeekDay(2020,8,1 )).toBe(1);
  expect(builder.getWeekDay(2020,7,31 )).toBe(0);
  expect(builder.getWeekDay(2020,5,6 )).toBe(5);
});