const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let map = {};
  puzzle.forEach(line => {
    checkLine(line, map);
  })
  const count = Object.entries(map).filter(([key, value]) => value >= 2).length
  const duration = new Date() - start;
  return {value: count, duration};
}

function checkLine(line, map, includeDiagonal) {
  if (line[0].x == line[1].x) {
    const x = line[0].x;
    const {start, end} = getStartEnd(line[0].y, line[1].y);
    for (let y = start; y <= end; y++) {
      const key = `${x},${y}`;
      if (map[key]) {
        map[key] ++;
      } else {
        map[key] = 1;
      }
    }
  } else if (line[0].y == line[1].y) {
    const y = line[0].y;
    const  {start, end} = getStartEnd(line[0].x, line[1].x);
    for (let x = start; x <= end; x++) {
      const key = `${x},${y}`;
      if (map[key]) {
        map[key] ++;
      } else {
        map[key] = 1;
      }
    }
  } else if (includeDiagonal && (Math.abs(line[0].x - line[1].x) == Math.abs(line[0].y - line[1].y))) {
    const xline = {start: line[0].x, end: line[1].x};
    const yline = {start: line[0].y, end: line[1].y};
    let y = yline.start;
    let x = xline.start;
    let yIncrement = yline.end > yline.start;
    let xIncrement = xline.end > xline.start;
    while (((xIncrement && x <= xline.end) || (!xIncrement && x >= xline.end)) && ((yIncrement && y <= yline.end) || (!yIncrement && y >= yline.end))) {
      const key = `${x},${y}`;
      if (map[key]) {
        map[key] ++;
      } else {
        map[key] = 1;
      }
      if (yIncrement) {
        y ++;
      } else {
        y --;
      }
      if (xIncrement) {
        x ++;
      } else {
        x --;
      }
    }
  }
}


function getStartEnd(a, b) {
  let start, end;
  if(a > b) {
    end = a;
    start = b;
  } else {
    end = b;
    start = a
  }
  return {start, end}
}

function p2(puzzle) {
  const start = new Date();
  let map = {};
  puzzle.forEach(line => {
    checkLine(line, map, true);
  });
  const count = Object.entries(map).filter(([key, value]) => value >= 2).length
  const duration = new Date() - start;
  return {value: count, duration};
}

function parseInput(input) {
  return splitLines(input).map(x => x.split(' -> ').map(y => {
    let vals = y.trim().split(',');
    return {x: parseInt(vals[0], 10), y: parseInt(vals[1], 10)}
  }));
}

module.exports = {solve}