const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

class BookController {
  static get DATABASE_URL() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'myLibrary';

    return { url, dbName };
  }

  static getIndex(nav) {
    return (req, res) => {
      const { url, dbName } = BookController.DATABASE_URL;

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
    };
  }

  static getById(nav, bookService) {
    return (req, res) => {
      const { id } = req.params;
      const { url, dbName } = BookController.DATABASE_URL;

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('connecting to server');

          const db = client.db(dbName);

          const collect = await db.collection('books');
          const book = await collect.findOne({ _id: new ObjectID(id) });
          debug(book);

          book.details = await bookService.getBookById(book.bookId);
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
    };
  }

  static middleware() {
    return (req, res, next) => {
      if (req.user) next();
      else res.redirect('/');
    };
  }
}

module.exports = BookController;
