const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let smallest;
  for (let i = 0; i < Math.max(...puzzle); i++) {
    let fuel = 0;
    for (let j = 0; j < puzzle.length; j++) {
      fuel += Math.abs(i - puzzle[j]);
    }
    if (fuel < smallest || smallest == null) {
      smallest = fuel;
    } 
  }
  const duration = new Date() - start;
  return {value: smallest, duration};
}

function getFuelNumber(diff) {
  let factor = 1;
  let fuel = 0;
  for (let i = 0; i < diff; i++) {
    fuel += factor;
    factor++;
  }
  return fuel;
}

function p2(puzzle) {
  const start = new Date();
  let smallest;
  let diffs = [];
  for (let i = 0; i < Math.max(...puzzle); i++) {
    let fuel = 0;
    for (let j = 0; j < puzzle.length; j++) {
      if (puzzle[j] != i) {
        fuel += getFuelNumber(Math.abs(puzzle[j] - i));
      }
    }
    diffs.push(fuel);
    if (fuel < smallest || smallest == null) {
      smallest = fuel;
    } 
  }
  const duration = new Date() - start;
  return {value: smallest, duration};
}

function parseInput(input) {
  return input.split(',').map(x => parseInt(x, 10));
}

module.exports = {solve}