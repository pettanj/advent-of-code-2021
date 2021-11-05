const {solve} = require('./calculations');
const fs = require('fs');
exports.list = async function(req, res) {
  res.send(Array.from(Array(24).keys()).map(num => createListItem(parseInt(num, 10) + 1)));
}

function createListItem(num) {
  return {id: num, date: Date.UTC(2021, 11, num)};
}

exports.calculateAndGet = async function(req, res) {
  const answer = solve(req.params.id, req.body.puzzle || '');

  if (answer == null) {
    res.sendStatus(404);
  } else {
    res.send({...createListItem(parseInt(req.params.id, 10)), ...answer});
  }
}

exports.get = async function(req, res) {

  if (req.params.id == null) {
    res.sendStatus(404);
  } else {
    res.send({...createListItem(parseInt(req.params.id, 10))});
  }
}