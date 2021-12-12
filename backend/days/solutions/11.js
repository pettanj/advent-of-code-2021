const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  return {part1: p1(parseInput(input)), part2: p2(parseInput(input))};
}

function p1(puzzle) {
  const start = new Date();
  let board = Array.from(puzzle);
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    [board, flashes] = tick(board, flashes);
  }
  const duration = new Date() - start;
  return {value: flashes, duration: duration};
}

function tick(puzzle, flashes) {
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      puzzle[y][x] ++;
    }
  }

  let flashed = [];
  [puzzle, flashed] = flashHelper(puzzle, flashed);
  flashes += flashed.length;
  flashed.forEach(point => {
    let [x,y] = point.split('');
    puzzle[y][x] = 0;
  })

  return [puzzle, flashes];
}

function getFlashPoints(puzzle, flashed) {
  let points = [];
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (puzzle[y][x] > 9 && !flashed.includes('' + x + y)) {
        points.push({x, y});
      }
    }
  }
  return points;
}

function flashHelper(puzzle, flashed) {

  let flashPoints = getFlashPoints(puzzle, flashed);
  if (flashPoints.length == 0) {
    return [puzzle, flashed];
  } else {
    flashPoints.forEach(point => {
      flashed.push('' + point.x + point.y);
      flash(puzzle, point.x, point.y);
    });
    return flashHelper(puzzle, flashed)
  }
}

function flash(puzzle, x, y) {
  if (x > 0) {
    puzzle[y][x - 1]++;
    if (y > 0) {
      puzzle[y - 1][x - 1]++;
    }
    if (y < puzzle.length-1) {
      puzzle[y + 1][x - 1]++;
    }
  }
  if (y > 0) {
    puzzle[y - 1][x]++;
  }
  if (x < puzzle[y].length - 1) {
    puzzle[y][x + 1]++;
    if (y < puzzle.length - 1) {
      puzzle[y + 1][x + 1]++;
    }
    if (y > 0) {
      puzzle[y - 1][x + 1]++;
    }
  }
  if (y < puzzle.length-1) {
    puzzle[y + 1][x]++;
  }
  return puzzle;
}

function p2(puzzle) {
  const start = new Date();
  let board = Array.from(puzzle);
  let flashes = 0;
  let i = 0;
  while(!board.flatMap(x => x).every(x => x === 0)) {
    [board, flashes] = tick(board, flashes);
    console.log('------')
    board.forEach(x => x.join(''))
    i++;
  }
  const duration = new Date() - start;
  return {value: i, duration};
}

function parseInput(input) {
  return splitLines(input).map(x => x.split('').map(x => parseInt(x, 10)));
}

module.exports = {solve}