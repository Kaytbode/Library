const xml2js = require('xml2js');
const axios = require('axios');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });
// you will have to get yours....
const API_KEY = '4AcUrYrpY3jO72H6fnP8MQ';

class BookService {
  static getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=${API_KEY}`)
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
