const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let mostCommonList = getMostcommon(puzzle);
  let gamma = parseInt(mostCommonList.map(x => x.one > x.zero ? 1 : 0).join(''), 2);
  let epsilon = parseInt(mostCommonList.map(x => x.one < x.zero ? 1 : 0).join(''), 2);
  const duration = new Date() - start;
  return {value: gamma * epsilon, duration};
}

function p2(puzzle) {
  const start = new Date();
  let co2Rating = getCo2(puzzle);
  let oxygenRating = getOxygen(puzzle);
  const duration = new Date() - start;
  return {value: getBinaryAsDec(oxygenRating) *  getBinaryAsDec(co2Rating), duration};
}

function getOxygen(puzzle) {
  let oxygenCommonList = getMostcommon(puzzle);
  let oxygenRating = [...puzzle];
  let i = 0;
  while (oxygenRating.length > 1) {
    oxygenRating = oxygenRating.filter(x => x[i] == (oxygenCommonList[i].one >= oxygenCommonList[i].zero ? 1 : 0));
    oxygenCommonList = getMostcommon(oxygenRating);
    i ++;
  }
  return oxygenRating[0];
}

function getCo2(puzzle) {
  let co2CommonList = getMostcommon(puzzle);
  let co2Rating = [...puzzle];
  let i = 0;
  while (co2Rating.length > 1) {
    co2Rating = co2Rating.filter(x => x[i] == (co2CommonList[i].one < co2CommonList[i].zero ? 1 : 0));
    co2CommonList = getMostcommon(co2Rating);
    i ++;
  }
  return co2Rating[0];
}

function getMostcommon(puzzle) {
  let mostCommonList = [];
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (mostCommonList.length - 1  < j) {
        mostCommonList.push({zero: 0, one: 0})
      }
      if (puzzle[i][j] == 0) {
        mostCommonList[j].zero ++;
      } else {
        mostCommonList[j].one ++;
      }
    }
  }

  return mostCommonList;
}

function getBinaryAsDec(num) {
  return parseInt(num.join(''), 2);
}


function parseInput(input) {
  return splitLines(input).map(x => x.split('').map(y => parseInt(y, 10)));;
}

module.exports = {solve}