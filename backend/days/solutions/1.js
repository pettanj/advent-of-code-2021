const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1([...puzzle]), part2: p2([...puzzle])};
}

function p1(puzzle) {
  const start = new Date();
  const duration = new Date() - start;
  let increases = 0;
  let previousDepth = puzzle.shift();
  puzzle.forEach(depth => {
    if (depth > previousDepth) {
      increases++;
    }
    previousDepth = depth;
  });
  return {value: increases, duration};
}

function p2(puzzle) {
  const start = new Date();
  const duration = new Date() - start;
  let sums = [];
  while(puzzle.length >= 3) {
    sums.push(getGroup(puzzle));
    puzzle.shift();
  }
  let increases = 0;
  let previousSum = sums.shift();
  sums.forEach(sum => {
    if (sum > previousSum) {
      increases ++;
    }
    previousSum = sum;
  })
  return {value: increases, duration};
}

function getGroup(list) {
  let group = list.slice(0,3);
  return group.reduce((prev, current) => prev + current);
}

function parseInput(input) {
  return splitLines(input).map(x => parseInt(x, 10));
}

module.exports = {solve}