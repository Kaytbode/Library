const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

const router = () => {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { userName, passWord } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'myLibrary';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);

          const db = client.db(dbName);
          const collect = db.collection('users');
          const user = { userName, passWord };
          const result = await collect.insertOne(user);

          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      successRedirect: '/books',
      failureRedirect: '/'
    }));

  authRouter.route('/signOut')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) next();
      else res.redirect('/');
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
};

module.exports = router;
