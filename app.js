const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Library' });
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
