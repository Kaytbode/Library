const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
