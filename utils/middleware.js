require('dotenv').config();
require('../config/connection.js');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const middleware = (app) => {
  app.use(morgan('tiny')); // logging
  app.use(express.urlencoded({ extended: true })); // parses urlencoded request bodies
  app.use(methodOverride('_method')); // override for put and delete requests
  app.use(express.static('public'));

  app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      saveUninitialized: true,
      resave: false
    })
  )
}

module.exports = middleware;