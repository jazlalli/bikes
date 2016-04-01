var fs = require('fs');

var excluded = 'index.js';
var retailers = {};

var items = fs.readdirSync(__dirname);
items.forEach(function (item) {
  if (item !== excluded) {
    var crawl = require(__dirname + '/' + item + '/crawl');
    var scrape = require(__dirname + '/' + item + '/scrape');

    retailers[item] = {
      crawl: crawl,
      scrape: scrape
    };
  }
});

module.exports = retailers;