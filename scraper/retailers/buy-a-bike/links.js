var cheerio = require('cheerio');

module.exports = harvest;

function harvest(responseBody, callback) {
  var products = [];
  var $ = cheerio.load(responseBody);
      links = $('a.pname');

  links.each(function (idx, link) {
    var item = $(link);
    products.push({
      retailer: 'buy-a-bike',
      name: item.html().replace('  ', ''),
      url: item.attr('href')
    });
  });

  callback(null, products);
}
