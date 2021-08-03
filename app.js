const express = require('express');

const app = express();
const port = 3000;

const password = require('./password');

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

// gunakan ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    newPassword: password.getRandomString(12)
  });
});

app.get('/new/:id', (req, res) => {
  const { id } = req.params;
  if (isNumber(id)) {
    if (id > 24 || id <= 5) {
      res.status(200).json({
        status: 'fail',
        result: 'Password length must be greater than 5 and lower than 24'
      });
    }
    else {
      res.status(200).json({
        status: 'ok',
        result: password.getRandomString(id)
      });
    }
  }
  else {
    res.status(400).json({
      status: 'fail',
      result: 'Not valid length'
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
