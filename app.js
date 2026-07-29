const express = require('express');

const app = express();
const port = 3000;

const password = require('./password');

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

// gunakan ejs
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    newPassword: password.getRandomString(12)
  });
});

app.get('/new/:id', (req, res) => {
  const { id } = req.params;
  const options = {
    useSpecial: req.query.special !== 'false',
    useNumbers: req.query.numbers !== 'false',
    useUpper: req.query.upper !== 'false',
    useLower: req.query.lower !== 'false'
  };

  if (isNumber(id)) {
    if (id > 64 || id <= 5) {
      res.status(200).json({
        status: 'fail',
        result: 'Password length must be greater than 5 and lower than 64'
      });
    } else {
      res.status(200).json({
        status: 'ok',
        result: password.getRandomString(Number(id), options)
      });
    }
  } else {
    res.status(400).json({
      status: 'fail',
      result: 'Not valid length'
    });
  }
});

app.listen(port, () => {
  console.log(`BRUTE PASS app listening at http://localhost:${port}`);
});
