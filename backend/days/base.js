const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  return {part1: p1(parseInput(input)), part2: p2(parseInput(input))};
}

function p1(puzzle) {
  const start = new Date();
  const duration = new Date() - start;
  return {value: puzzle.length, duration};
}

function p2(puzzle) {
  const start = new Date();
  const duration = new Date() - start;
  return {value: puzzle.length, duration};
}

function parseInput(input) {
  return splitLines(input);
}

module.exports = {solve}