const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

const localStrategy = () => {
  passport.use(new Strategy(
    {
      usernameField: 'userName',
      passwordField: 'passWord'
    }, (userName, passWord, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'myLibrary';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);

          const db = client.db(dbName);
          const collect = db.collection('users');
          const user = await collect.findOne({ userName });
          debug(user);
          if (user.passWord === passWord) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err);
        }
        client.close();
      }());
    }
  ));
};

module.exports = localStrategy;
