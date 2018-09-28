const express = require('express');

const bookRouter = express.Router();

const router = (nav) => {
  bookRouter.get('/', (req, res) => {
    res.render(
      'bookList',
      {
        title: 'Library',
        nav
      }
    );
  });

  bookRouter.get('/:id', (req, res) => {
    // const { id } = req.params;
    res.render(
      'book',
      {
        title: 'Library',
        nav,
      }
    );
  });

  return bookRouter;
};

module.exports = router;
