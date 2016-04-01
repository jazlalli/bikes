var async = require('async'),
    request = require('request'),
    retailers = require('./retailers'),
    mongoose = require('mongoose'),
    Bike = require('../models/Bike');

var endpoint = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bikes';
var db = mongoose.connection;
mongoose.connect(endpoint);

var CONCURRENCY = 5;

var q = async.queue(function (task, cb) {
  if (!task.url || !task.retailer) cb();

  var _scrape = retailers[task.retailer].scrape;

  request(task.url, function (error, res, body) {
    if (!error) {
      _scrape(body, function (err, product) {
        if (!err) {
          product.link = task.url;
          var query = {link: task.url};

          Bike.findOneAndUpdate(query, product, {upsert:true}, function (err, doc) {
            console.log('saved', product.name, 'from', product.retailer);
            cb();
          });
        }
      });
    }
  });

}, CONCURRENCY);

function scrape(targets, callback) {

  q.drain(function () {
    console.log('done scraping!');
    mongoose.connection.close();
    return callback();
  });

  targets.forEach(target => {
    var product = target.split(',');
    var task = {
      retailer: product[0],
      product: product[1],
      url: product[2]
    };

    if (task.retailer === 'buy-a-bike') { q.push(task); }
  });
}

module.exports = scrape;
