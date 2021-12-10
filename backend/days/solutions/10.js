const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  const startSymbols = ['(', '[', '{', '<'];
  const endSymbols = {')': '(', ']': '[', '}': '{', '>': '<'};
  let points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  let errorScore = 0;
  for (let line of puzzle) {
    let startBuffer = [];
    for (let char of line) {
      if (startSymbols.includes(char)) {
        startBuffer.push(char);
      } else {
        let lastStart = startBuffer.pop();
        if (endSymbols[char] !== lastStart) {
          errorScore += points[char];
          break;
        }
      }
    }
  }
  const duration = new Date() - start;
  return {value: errorScore, duration};
}

function p2(puzzle) {
  const start = new Date();
  const startSymbols = ['(', '[', '{', '<'];
  const endSymbols = {')': '(', ']': '[', '}': '{', '>': '<'};
  let points = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  }
  let errorScores = [];
  for (let line of puzzle) {
    let startBuffer = [];
    for (let char of line) {
      if (startSymbols.includes(char)) {
        startBuffer.push(char);
      } else {
        let lastStart = startBuffer.pop();
        if (endSymbols[char] !== lastStart) {
          startBuffer = [];
          break;
        }
      }
    }
    if (startBuffer.length > 0) {
      let score = 0;
      startBuffer.reverse().forEach(x => {
        score = score * 5 + points[x];
      });
      console.log('score: ', score)
      errorScores.push(score);
    }
  }
  let finalScore = errorScores.sort((a,b) => a-b)[Math.floor(errorScores.length/2)];
  const duration = new Date() - start;
  return {value: finalScore, duration};
}

function parseInput(input) {
  return input.split('\n').map(x => x.split(''));
}

module.exports = {solve}