/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

// process.env.NODE_ENV = 'dev'; // dev
// process.env.PORT = '3212'; // dev

process.env.NODE_ENV = 'prod'; // prod
process.env.PORT = '3112'; // prod

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var config = require('config');
var bodyParser = require('body-parser');
var cors = require('cors');
var device = require('express-device');
var fs = require('fs');
var mongoose = require('mongoose');

var logger = require('./src/lib/logger');

// ============================================= Begin of app.js ========================================= //

var app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(device.capture({parseUserAgent: true}));
app.set('env', 'production');

var jsonParser = bodyParser.json({limit: '10mb'});
var urlencodedParser = bodyParser.urlencoded({
  extended: false, limit: '10mb', parameterLimit: 500
});
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:4217', 'http://localhost:4228']
// }));

app.use(express.static(path.join(__dirname, 'config')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in production
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, ctpeuatoken, ctpeuotoken, ctpeuua');

  // Response headers you wish to Expose
  res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, content-type, ctpeuatoken, ctpeuotoken');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// dynamically include routes
fs.readdirSync('./src/routes').forEach((file) => {
  if (file.substr(-3) == '.js') {
    require('./src/routes/' + file).controller(app);
  }
});

module.exports = app;

// ============================================= End of app.js ========================================= //


// --- Start of Code to Handle Uncaught Exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception: ' + error);
});
// --- End of Code for Handle Uncaught Exceptions

// --- Start: Mongoose
mongoose.Promise = Promise;
// --- Connect to the db
mongoose.connect(config.mongoDBConnection)
.then(() => logger.error('Connected MongoDB.'))
.catch((error) => logger.error('MongoDB Connection: Error: ' + error));
// --- End: Mongoose
