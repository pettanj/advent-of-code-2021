function auth(req, res, next) {
  // x-api-key
  // if not xapi header
  // if not right key
  if (!req.header('x-api-key') || req.header('x-api-key') !== 'test-api-key') {
    res.status(401);
    return res.json({message: 'Invalid api key'});
  }

  next();
}

module.exports = {auth};