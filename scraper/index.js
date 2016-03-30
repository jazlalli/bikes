var fs = require('fs');
var crawl = require('./crawler');
var scrape = require('./scraper');
var sites = require('./targets.json');

var arg = process.argv.slice(process.argv.length - 1)[0];
arg = arg.replace(/^(-)+/, '');

if (arg === 'harvest') {
  return harvest();
}

if (arg === 'hydrate') {
  return hydrate();
}

function harvest() {
  var targets = [];
  var sources = Object.keys(sites);
  var productFile = 'products.csv';
  fs.writeFileSync(productFile, '', 'utf8');

  for (var i = 0, len = sources.length; i < len; i++) {
    var retailer = sources[i];

    var urls = sites[retailer].map(function (item) {
      var result = {retailer: retailer};
      result.url = item;
      return result;
    });

    targets = targets.concat(urls);
  }

  targets.forEach(function (target) {
    crawl(target, function (err, data) {
      if (!err) {
        data.map(function (item) {
          var line = [item.retailer, item.name, item.url].join(',') + '\n';
          fs.appendFileSync(productFile, line, 'utf8');
        })
      }
    });
  });
}


function hydrate() {
  fs.readFile('products.csv', function (err, contents) {
    if (err) {
      return console.log(err);
    }

    var products = contents.toString().split('\n');
    products.forEach(function (product) {
      if (!product) return false;

      scrape(product, function (err) {
        if (!err) {
          return console.log('ALL DONE!');
        }
      });
    });
  });
}