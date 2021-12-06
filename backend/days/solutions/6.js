const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let state = Object.assign(puzzle);
  for (let i = 0; i < 80; i++) {
    state = executeDay(state);
  } 
  const duration = new Date() - start;
  return {value: state.length, duration};
}

function executeDay(state) {
  let newFishes = [];
  for (let i = 0; i < state.length; i++) {
    if (state[i] == 0) {
      newFishes.push(8);
      state[i] = 6;
    } else {
      state[i] -= 1;
    }
  };
  state = state.concat(newFishes);
  return state;
}

function p2(puzzle) {
  const start = new Date();
  const duration = new Date() - start;
  return {value: puzzle.length, duration};
}

function parseInput(input) {
  return input.split(',').map(x => parseInt(x, 10));
}

module.exports = {solve}