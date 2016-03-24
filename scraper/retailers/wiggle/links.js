var cheerio = require('cheerio');

module.exports = harvest;

function harvest(responseBody, callback) {
  var products = [];
  var $ = cheerio.load(responseBody);
      links = $('a.bem-product-thumb__image-link--grid');

  links.each(function (idx, link) {
    var item = $(link);
    products.push({
      retailer: 'wiggle',
      name: item.attr('title'),
      url: item.attr('href')
    });
  });

  callback(null, products);
}
