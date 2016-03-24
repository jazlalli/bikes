var fs = require('fs'),
    request = require('request'),
    retailers = require('./retailers'),
    mongoose = require('mongoose');

var endpoint = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bikes';
var db = mongoose.connection;

// mongoose.connect(endpoint);

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

fs.readFile('products.csv', function (err, contents) {
  if (err) {
    return console.log(err);
  }

  var products = contents.toString().split('\n');
  products.forEach(function (product) {
    if (!product) return false;

    var p = product.split(',');
    var retailer = p[0],
        productName = p[1],
        url = p[2];

    var scrape = retailers[retailer].scrape;

    request(url, function (err, res, body) {
      if (!err) {
        scrape(body, function (err, productData) {
          if (!err) {
            productData.link = url;

            var bike = new Bike(productData);
            // console.log(bike);
          }
        })
      }
    });
  });
});