var cheerio = require('cheerio');

module.exports = harvest;

function harvest(responseBody, callback) {
  var products = [];
  var $ = cheerio.load(responseBody);
      imgs = $('img.product-image-file');

  imgs.each(function (idx, img) {
    var item = $(img);
    products.push({
      retailer: 'evans',
      name: item.attr('title'),
      url: 'https://www.evanscycles.com' + item.parent().parent().attr('href')
    });
  });

  callback(null, products);
}
