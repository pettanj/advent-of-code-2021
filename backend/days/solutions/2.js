const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  const state = executeProgram1(puzzle, {horizontal: 0, depth: 0});
  const duration = new Date() - start;
  return {value: state.horizontal * state.depth, duration};
}

function p2(puzzle) {
  const start = new Date();
  const state = executeProgram2(puzzle, {horizontal: 0, depth: 0, aim: 0});
  const duration = new Date() - start;
  return {value: state.horizontal * state.depth, duration};
}

function executeProgram1(program, state) {
  const currentState = Object.assign(state);
  for (const instruction of program) {
    switch(instruction.type) {
      case 'forward':
        currentState.horizontal +=  instruction.value;
        break;
      case 'down':
        currentState.depth += instruction.value;
        break;
      case 'up':
        currentState.depth -= instruction.value;
        break;
      default:
        break;
        }
  }
  return currentState;
}

function executeProgram2(program, state) {
  const currentState = Object.assign(state);
  for (const instruction of program) {
    switch(instruction.type) {
      case 'forward':
        currentState.horizontal +=  instruction.value;
        currentState.depth += (currentState.aim * instruction.value);
        break;
      case 'down':
        currentState.aim += instruction.value;
        break;
      case 'up':
        currentState.aim -= instruction.value;
        break;
      default:
        break;
        }
  }
  return currentState;
}

function parseInput(input) {
  return splitLines(input).map(x => {
    let splitVals = x.split(' ');
    return {type: splitVals[0], value: parseInt(splitVals[1], 10)};
  })
}

module.exports = {solve}