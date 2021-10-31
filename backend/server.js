const express = require('express');
const cors = require('cors');
const {auth} = require('./utils/auth')
const app = express();
require('express-async-errors');
const {errorHandling} = require('./utils/error');
const days = require('./days/endploints');

app.use(express.json());

app.use(cors());
app.use('/', express.static('public'));

app.get('/days', auth, days.list);
app.get('/day/:id', auth, days.calculateAndGet)

app.post('/testpost', auth, async (req, res) => {
  console.log(req.body)
  res.send(req.body);
})
app.use(errorHandling);

app.listen(3001, function() {
  console.log('Server started on port 3001');
});
