const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let state = [...puzzle];
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

function executeDay2(state) {
  let newState = {};
  for (let i = 1; i <= 8; i++) {
    newState[i-1] = state[i];
  }
  newState[8] = state[0];
  newState[6] = newState[6] + state[0];
  return newState;
}

function p2(puzzle) {
  console.log(puzzle)
  const start = new Date();
  let state = {};
  for (let i = 0; i <= 8; i++) {
    state[i] = 0;
  }
  for (let item of puzzle) {
    state[item] ++;
  }
  for (let i = 0; i < 256; i++) {
    state = executeDay2(state);
  }
  let answer = Object.values(state).reduce((prev, curr) => prev + curr);
  const duration = new Date() - start;
  return {value: answer, duration};
}

function parseInput(input) {
  return input.split(',').map(x => parseInt(x, 10));
}

module.exports = {solve}