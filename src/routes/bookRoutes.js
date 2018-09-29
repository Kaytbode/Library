const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

const router = (nav) => {
  bookRouter.get('/', (req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'myLibrary';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('connecting to server');

        const db = client.db(dbName);

        const collect = await db.collection('books');
        const books = await collect.find().toArray();

        res.render(
          'bookList',
          {
            title: 'Library',
            nav,
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  bookRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'myLibrary';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('connecting to server');

        const db = client.db(dbName);

        const collect = await db.collection('books');
        const book = await collect.findOne({ _id: new ObjectID(id) });
        debug(book);

        res.render(
          'book',
          {
            title: 'Library',
            nav,
            book
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  return bookRouter;
};

module.exports = router;
