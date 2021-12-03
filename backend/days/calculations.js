const p1 = require('./solutions/1');
const p2 = require('./solutions/2');
const p3 = require('./solutions/3');

function solve (day, puzzle) {
  switch (parseInt(day, 10)) {
    case 1:
      return {...p1.solve(puzzle), ...{puzzle}};
    case 2:
      return {...p2.solve(puzzle), ...{puzzle}};
    case 3:
      return {...p3.solve(puzzle), ...{puzzle}};
    default:
      return null;
  }
}
module.exports = {solve};