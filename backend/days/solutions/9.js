// Return value should be in form
// {part1, part2, duration}

function solve (input) {
  let puzzle = parseInput(input);
  return {part1: p1(puzzle), part2: p2(puzzle)};
}

function p1(puzzle) {
  const start = new Date();
  let risk = 0;
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (y == 0) {
        if (x == 0 && (puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y + 1][x])) {
          risk += (1 + puzzle[y][x]);
        } else if ((x == puzzle[y].length - 1) && (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y + 1][x])) {
          risk += (1 + puzzle[y][x]);
        } else if (
          puzzle[y][x] < puzzle[y + 1][x] &&
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          risk += (1 + puzzle[y][x]);
        }
      } else if (x == 0) {
        if (y == 0) {
          if(puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y + 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (y == puzzle.length - 1) {
          if(puzzle[y][x] < puzzle[y - 1][x] && puzzle[y][x] < puzzle[y][x + 1]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (
          puzzle[y][x] < puzzle[y + 1][x] &&
          puzzle[y][x] < puzzle[y - 1][x] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          risk += (1 + puzzle[y][x]);
        }
      } else if (y == puzzle.length - 1) {
        if (x == 0){
          if(puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y - 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (x == puzzle[y].length - 1) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y - 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (
          puzzle[y][x] < puzzle[y - 1][x] &&
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          risk += (1 + puzzle[y][x]);
        }
      } else if (x == puzzle[y].length - 1) {
        if (y == 0) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y + 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (y == puzzle[y].length - 1) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y - 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y -1][x] &&
          puzzle[y][x] < puzzle[y +1][x]) {
          risk += (1 + puzzle[y][x]);
        }
      } else if (
        puzzle[y][x] < puzzle[y - 1][x] &&
        puzzle[y][x] < puzzle[y + 1][x] &&
        puzzle[y][x] < puzzle[y][x - 1] &&
        puzzle[y][x] < puzzle[y][x + 1]) {
          risk += (1 + puzzle[y][x]);
        }
    }
  }
  const duration = new Date() - start;
  return {value: risk, duration};
}

let checked = {};

function getBasin(puzzle, x, y) {
  let size = 1;
  if (puzzle[y][x] == 9 || checked[`${x},${y}`]) {
    return 0;
  }
  checked[`${x},${y}`] = true;
  if (x < puzzle[y].length - 1 && puzzle[y][x] < puzzle[y][x + 1]) {
    size += getBasin(puzzle, x + 1, y);
  }

  if ( x > 0 && puzzle[y][x] < puzzle[y][x - 1]) {
    size += getBasin(puzzle, x - 1, y);
  }

  if (y < puzzle.length - 1 && puzzle[y][x] < puzzle[y + 1][x]) {
    size += getBasin(puzzle, x, y + 1);
  }

  if (y > 0 && puzzle[y][x] < puzzle[y - 1][x]) {
    size += getBasin(puzzle, x, y - 1);
  }
  return size;
}


function p2(puzzle) {
  const start = new Date();
  let basins = [];
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      if (y == 0) {
        if (x == 0 && (puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y + 1][x])) {
          risk += (1 + puzzle[y][x]);
        } else if ((x == puzzle[y].length - 1) && (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y + 1][x])) {
          basins.push(getBasin(puzzle, x, y))
        } else if (
          puzzle[y][x] < puzzle[y + 1][x] &&
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          basins.push(getBasin(puzzle, x, y))
        }
      } else if (x == 0) {
        if (y == 0) {
          if(puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y + 1][x]) {
            risk += (1 + puzzle[y][x]);
          }
        } else if (y == puzzle.length - 1) {
          if(puzzle[y][x] < puzzle[y - 1][x] && puzzle[y][x] < puzzle[y][x + 1]) {
          basins.push(getBasin(puzzle, x, y))
        }
        } else if (
          puzzle[y][x] < puzzle[y + 1][x] &&
          puzzle[y][x] < puzzle[y - 1][x] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          basins.push(getBasin(puzzle, x, y))
        }
      } else if (y == puzzle.length - 1) {
        if (x == 0){
          if(puzzle[y][x] < puzzle[y][x + 1] && puzzle[y][x] < puzzle[y - 1][x]) {
            risk += (1 + puzzle[y][x]);
          basins.push(getBasin(puzzle, x, y))
        }
        } else if (x == puzzle[y].length - 1) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y - 1][x]) {
          basins.push(getBasin(puzzle, x, y))
        }
        } else if (
          puzzle[y][x] < puzzle[y - 1][x] &&
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y][x + 1]) {
          basins.push(getBasin(puzzle, x, y))
          }
      } else if (x == puzzle[y].length - 1) {
        if (y == 0) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y + 1][x]) {
          basins.push(getBasin(puzzle, x, y))
        }
        } else if (y == puzzle[y].length - 1) {
          if (puzzle[y][x] < puzzle[y][x - 1] && puzzle[y][x] < puzzle[y - 1][x]) {
          basins.push(getBasin(puzzle, x, y))
        }
        } else if (
          puzzle[y][x] < puzzle[y][x - 1] &&
          puzzle[y][x] < puzzle[y -1][x] &&
          puzzle[y][x] < puzzle[y +1][x]) {
          basins.push(getBasin(puzzle, x, y))
        }
      } else if (
        puzzle[y][x] < puzzle[y - 1][x] &&
        puzzle[y][x] < puzzle[y + 1][x] &&
        puzzle[y][x] < puzzle[y][x - 1] &&
        puzzle[y][x] < puzzle[y][x + 1]) {
          basins.push(getBasin(puzzle, x, y))
        }
    }
  }

  let sum = basins.sort((a, b) => b - a).slice(0, 3).reduce((prev, curr) => prev * curr);
  const duration = new Date() - start;
  return {value: sum, duration};
}

function parseInput(input) {
  return input.split('\n').map(x => x.trim()).map(x => x.split('').map(x => parseInt(x, 10)));
}

module.exports = {solve}