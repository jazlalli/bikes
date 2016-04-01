var async = require('async'),
    request = require('request'),
    retailers = require('./retailers'),
    mongoose = require('mongoose'),
    Target = require('../models/Target');

var endpoint = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bikes';
var db = mongoose.connection;
mongoose.connect(endpoint);

var products = [];
var CONCURRENCY = 5;

var q = async.queue(function (task, cb) {
  console.log('crawling', task.url);

  var retailer = task.retailer;
  var _crawl = retailers[retailer].crawl;

  request(task.url, function (err, res, body) {
    if (!err) {

      _crawl(body, function (err, data) {
        products = products.concat(data);
        cb();
      });
    }
  });
}, CONCURRENCY);

function crawl(targets, callback) {
  q.drain = function() {
    console.log('retrieved', products.length, 'products');
    callback(null, products);

    mongoose.connection.close();
    products = [];
  };

  targets.forEach(t => q.push(t));
}

module.exports = crawl;
