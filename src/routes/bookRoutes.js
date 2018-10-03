const express = require('express');
const Controller = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

const router = (nav) => {
  bookRouter.use(Controller.middleware());

  bookRouter.get('/', Controller.getIndex(nav));

  bookRouter.get('/:id', Controller.getById(nav, bookService));

  return bookRouter;
};

module.exports = router;
