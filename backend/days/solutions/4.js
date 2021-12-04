const {splitLines} = require('./utils');

// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let bingoBoard = null;
  let winningDraw = null;
  for (const draw of puzzle.draws) {
    checkDraw(draw, puzzle.boards);
    const bingo = getBingo(puzzle.boards);
    if (bingo != null) {
      bingoBoard = bingo;
      winningDraw = draw;
      break;
    }
  }
  const duration = new Date() - start;
  return {value: getUnmarkedSum(bingoBoard.square) * winningDraw, duration};
}

function getUnmarkedSum(square) {
  let sum = 0;
  for (const line of square) {
    line.map(x => x[1] == false ? x[0] : 0).forEach(val => {
      sum += val;
    })
  }
  return sum;
}

function getBingo(boards) {
  let bingo = null;
  for (const square of boards) {
    const squareBingo = checkSquareForBingo(square);
    if (squareBingo.bingo) {
      bingo = {...squareBingo};
    }
  }
  return bingo;
}

function getNoBingos(boards) {
  return boards.filter(square => !checkSquareForBingo(square)?.bingo);
}

function checkDraw(draw, boards) {
  for (const board of boards) {
    for (const line of board) {
      for (const num of line) {
        if (num[0] === draw) {
          num[1] = true;
          break;
        }
      }
    }
  }
}

function checkSquareForBingo(square) {
  let bingo = false;
  for (const line of square) {
    if (line.map(x => x[1]).every(x => x == true)) {
      bingo = true;
      break;
    }
  }
  for (let i = 0; i < square.length; i++){
    if (square.map(val => val[i][1]).every(x => x == true)) {
      bingo = true;
      break;
    }
  }
  return {bingo, square};
}

function p2(puzzle) {
  const start = new Date();
  let lastBingoBoard = null;
  let winningDraw = null;
  for (const draw of puzzle.draws) {
    checkDraw(draw, puzzle.boards);
    if (puzzle.boards.length == 1) {
      if (checkSquareForBingo(puzzle.boards[0]).bingo) {
        lastBingoBoard = puzzle.boards[0];
        winningDraw = draw;
        break;
      }
    } else {
      puzzle.boards = getNoBingos(puzzle.boards);
    }
  }
  const duration = new Date() - start;
  return {value: getUnmarkedSum(lastBingoBoard) * winningDraw, duration};
}

function parseInput(input) {
  let lines = splitLines(input);
  let draws = lines.shift().split(',').map(x => parseInt(x, 10));
  lines.shift();
  let boards = [];
  let square = [];
  for (const line of lines) {
    if (line.length == 0) {
      boards.push([...square]);
      square = [];
    } else {
      square.push(line.split(' ').filter(x => x != '').map(x => [parseInt(x.trim(), 10), false]));
    }
  }
  boards.push([...square]);

  return {draws, boards};
}

module.exports = {solve}