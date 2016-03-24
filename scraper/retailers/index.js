var fs = require('fs');

var excluded = 'index.js';
var retailers = {};

var items = fs.readdirSync(__dirname);
items.forEach(function (item) {
  if (item !== excluded) {
    var getLinks = require(__dirname + '/' + item + '/links');
    var scrapePage = require(__dirname + '/' + item + '/product');

    retailers[item] = {
      getLinks: getLinks,
      scrape: scrapePage
    };
  }
});

module.exports = retailers;