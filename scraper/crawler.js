var async = require('async'),
    request = require('request'),
    retailers = require('./retailers');

module.exports = crawl;

function crawl(target, callback) {
  target = target || {};

  var limit = 1;
  var products = [];
  var retailer = target.retailer;
  var getLinks = retailers[retailer].getLinks;

  var q = async.queue(function (task, cb) {
    request(task.url, function (err, res, body) {
      if (!err) {

        getLinks(body, function (err, data) {
          products = data;
          cb();
        });
      }
    });
  }, limit);

  q.drain = function() {
    console.log('got', products.length, 'products from', target.retailer);
    callback(null, products);
  };

  q.push(target);
}
