var fs = require('fs');
var crawl = require('./crawler');
var scrape = require('./scraper');
var sites = require('./targets.json');
var sources = Object.keys(sites);
var targets = [];

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
