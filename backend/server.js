const express = require('express');
const cors = require('cors');
const {auth} = require('./utils/auth')
const app = express();
require('express-async-errors');
const {errorHandling} = require('./utils/error');

app.use(express.json());

app.use(cors());
app.use('/', express.static('public'));

app.get('/days', auth, async (req, res) => {
  res.send([{id: 17, date: new Date()}])
})

app.post('/testpost', auth, async (req, res) => {
  console.log(req.body)
  res.send(req.body);
})
app.use(errorHandling);

app.listen(3001, function() {
  console.log('Server started on port 3001');
});
