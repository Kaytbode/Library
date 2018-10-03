const xml2js = require('xml2js');
const axios = require('axios');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

class BookService {
  static getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=4AcUrYrpY3jO72H6fnP8MQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) debug(err);
            else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }
}

module.exports = BookService;
