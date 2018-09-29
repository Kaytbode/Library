const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRoute = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Fiction',
    author: 'Lev Tolstoy',
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Fiction',
    author: 'Levo Tolstoy',
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Fiction',
    author: 'Leva Tolstoy',
    read: false
  },
  {
    title: 'War and Peace',
    genre: 'Fiction',
    author: 'Levi Tolstoy',
    read: false
  },
];

const router = (nav) => {
  adminRoute.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'myLibrary';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('connecting to server');

          const db = client.db(dbName);

          const result = await db.collection('books').insertMany(books);
          res.json(result);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return adminRoute;
};

module.exports = router;
