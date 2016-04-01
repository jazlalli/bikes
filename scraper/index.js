var fs = require('fs');
var sites = require('./targets.json');

var arg = process.argv.slice(process.argv.length - 1)[0];
arg = arg.replace(/^(-)+/, '');

if (arg === 'crawl') {
  return harvestLinks();
}

if (arg === 'scrape') {
  return scrapeContent();
}

function harvestLinks() {
  var crawl = require('./crawler');

  var targets = [];
  var sources = Object.keys(sites);
  var productFile = 'products.csv';

  for (var i = 0, len = sources.length; i < len; i++) {
    var retailer = sources[i];

    var urls = sites[retailer].map(function (item) {
      var result = {retailer: retailer};
      result.url = item;
      return result;
    });

    targets = targets.concat(urls);
  }

  crawl(targets, function (err, results) {
    if (!err) {
      var csv = results.map(item => {
        var row = [item.retailer.trim(), item.name.trim(), item.url].join(',');
        return row + '\n';
      });

      fs.writeFile(productFile, csv.join(''), 'utf8', err => {
        if (!err) {
          console.log('done crawling!');
        }
      });
    }
  });
}


function scrapeContent() {
  var scrape = require('./scraper');

  fs.readFile('products.csv', function (err, contents) {
    if (err) {
      return console.log(err);
    }

    var products = contents.toString().split('\n');
    scrape(products, function (err) {
      if (!err) {
        return console.log('done scraping!');
      }
    });
  });
}