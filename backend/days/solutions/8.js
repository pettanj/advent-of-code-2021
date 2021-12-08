const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let sum = 0;
  puzzle.forEach(row => {
    row[1].forEach(x => {
      if ([2, 4, 3, 7].includes(x.length)) {
        sum += 1;
      }
    })
  })
  const duration = new Date() - start;
  return {value: sum, duration};
}

function getMap(list) {
  let valueMap = {}
  let map = {};
  let numberMap = {
    2: 1,
    4: 4,
    3: 7,
    7: 8}

  list.forEach(item => {
    if (Object.keys(numberMap).includes(item.length.toString())) {
      map[item] = numberMap[item.length];
      valueMap[map[item]] = item.split('');
    }
  })
  list.forEach(item => {
    let il = item.split('');
    if (item.length == 5) {
      if (getCommon(il, valueMap[7]) == 2 && getCommon(il, valueMap[1]) == 1 && getCommon(il, valueMap[4]) == 2) {
        map[item] = 2;
      } else if (getCommon(il, valueMap[7]) == 3 && getCommon(il, valueMap[1]) == 2 && getCommon(il, valueMap[4]) == 3) {
        map[item] = 3;
      } else if (getCommon(il, valueMap[7]) == 2 && getCommon(il, valueMap[1]) == 1 && getCommon(il, valueMap[4]) == 3) {
        map[item] = 5;
      }
    } else if (item.length == 6){
      if(getCommon(il, valueMap[7]) == 3 && getCommon(il, valueMap[1]) == 2 && getCommon(il, valueMap[4]) == 3) {
        map[item] = 0;
      } else if (getCommon(il, valueMap[7]) == 2 && getCommon(il, valueMap[1]) == 1 && getCommon(il, valueMap[4]) == 3) { 
        map[item] = 6;
      } else if (getCommon(il, valueMap[7]) == 3 && getCommon(il, valueMap[1]) == 2 && getCommon(il, valueMap[4]) == 4){ 
        map[item] = 9;
      }
    }
  })
  return map;
}

function getCommon(list1, list2) {
  return list1.filter(value => list2.includes(value)).length
}

function getOutputValue(list, map) {
  let digits = [];
  list.forEach(item => {
    let correct;
    for (let key of Object.keys(map)) {
      if (item.length == key.length && item.split('').map(x => key.split('').includes(x)).every(x => x === true)) {
        correct = map[key];
        break;
      }
    }
    digits.push(correct);
  })
  return digits;
}

function p2(puzzle) {
  const start = new Date();
  let answerArray = [];
  puzzle.forEach(row => {
    let map = getMap(row[0]);
    answerArray.push(parseInt(getOutputValue(row[1], map).join(''), 10));
  })
  const duration = new Date() - start;
  return {value: answerArray.reduce((prev, curr) => prev + curr), duration};
}

function parseInput(input) {
  return input.split('\n').map(x => x.split(' | ').map(y => y.split(' ').map(x => x.trim())));
}

module.exports = {solve}