var cheerio = require('cheerio');

module.exports = scrape;

function scrape(responseBody, callback) {
  var product = {};
  var $ = cheerio.load(responseBody),
      name = $('h1#productTitle').html(),
      price = $('span.js-unit-price').data('defaultValue'),
      description = $('div#tabDescription > .bem-content > p').first().html()
      image = $('img.imageSize430.mainImage').attr('src'),
      crumbs = $('li.bem-breadcrumbs__item'),
      category = '';


  crumbs.each(function (idx, crumb) {
    if (idx === (crumbs.length - 2)) {
      category = $(crumb).children().children().first().html();
    }
  });

  var product = {
    name: decodeURI(name.trim()),
    category: category,
    price: price,
    description: decodeURI(description),
    retailer: 'wiggle',
    image: decodeURI(image)
  };

  callback(null, product);
}
