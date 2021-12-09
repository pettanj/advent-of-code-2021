const p1 = require('./solutions/1');
const p2 = require('./solutions/2');
const p3 = require('./solutions/3');
const p4 = require('./solutions/4');
const p5 = require('./solutions/5');
const p6 = require('./solutions/6');
const p7 = require('./solutions/7');
const p8 = require('./solutions/8');
const p9 = require('./solutions/9');

function solve (day, puzzle) {
  switch (parseInt(day, 10)) {
    case 1:
      return {...p1.solve(puzzle), ...{puzzle}};
    case 2:
      return {...p2.solve(puzzle), ...{puzzle}};
    case 3:
      return {...p3.solve(puzzle), ...{puzzle}};
    case 4:
      return {...p4.solve(puzzle), ...{puzzle}};
    case 5:
      return {...p5.solve(puzzle), ...{puzzle}};
    case 6:
      return {...p6.solve(puzzle), ...{puzzle}};
    case 7:
      return {...p7.solve(puzzle), ...{puzzle}};
    case 8:
      return {...p8.solve(puzzle), ...{puzzle}};
    case 9:
      return {...p9.solve(puzzle), ...{puzzle}};
    default:
      return null;
  }
}
module.exports = {solve};