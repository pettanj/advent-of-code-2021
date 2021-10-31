exports.list = async function(req, res) {
  res.send([{id: 17, date: new Date()}]);
}

exports.calculateAndGet = async function(req, res) {
  res.send({
    id: 17,
    date: new Date(),
    answer: 3,
    duration: 500,
    puzzle: `
    aasd
    asd
    we
    qwa
    asd
    ags
    aswg
    ags`
  });
}