var async = require('async'),
    request = require('request'),
    retailers = require('./retailers'),
    mongoose = require('mongoose');

var endpoint = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bikes';
var db = mongoose.connection;
mongoose.connect(endpoint);

var bikeSchema = new mongoose.Schema({
  'name': String,
  'price': String,
  'category': String,
  'description': String,
  'retailer': String,
  'link': String,
  'image': String
});

var Bike = mongoose.model('Bike', bikeSchema);

var CONCURRENCY = 3;

var q = async.queue(function (task, cb) {
  var scrapeRetailer = retailers[task.retailer].scrape;

  request(task.url, function (error, res, body) {
    if (!error) {
      scrapeRetailer(body, function (err, product) {
        if (!err) {
          product.link = task.url;
          var query = {link: task.url};

          Bike.findOneAndUpdate(query, product, {upsert:true}, function (err, doc) {
            console.log('saved', product.name, 'from', product.retailer);
            return cb();
          });
        }
      });
    }
  });

}, CONCURRENCY);

module.exports = scrape;

function scrape(target, callback) {
  var p = target.split(',');
  var task = {
    retailer: p[0],
    product: p[1],
    url: p[2]
  };

  q.drain(function () {
    return callback();
  });

  q.push(task);
}

