const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRoute = express.Router();

/* Add your books here */
const books = [
//   {
//     title: 'MongoDB: The Definitive Guide',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 9418297,
//     read: false
//   },
//   {
//     title: '50 Tips and Tricks for MongoDB Developers',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 11356745,
//     read: false
//   },
//   {
//     title: 'Scaling MongoDB',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 10412675,
//     read: false
//   },
//   {
//     title: 'Mongodb: The Definitive Guide (Revised)',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 22492060,
//     read: false
//   },
//   {
//     title: 'Scaling MongoDB: Sharding, Cluster Setup, and Administration',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 35080434,
//     read: false
//   },
//   {
//     title: 'Mongodb: The Definitive Guide: Powerful and Scalable Data Storage',
//     genre: 'Science',
//     author: 'Kristina Chodorow',
//     bookId: 32758030,
//     read: false
//   }
];

const router = () => {
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
