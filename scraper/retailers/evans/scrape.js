var cheerio = require('cheerio');

module.exports = scrape;

function scrape(responseBody, callback) {
  var $ = cheerio.load(responseBody),
      name = $('h1.product-title').html(),
      price = $.html('meta[itemprop="lowPrice"]'),
      description = $('p.item-description').html(),
      image = $('a.tc-main-image-slot').children().first(),
      crumbs = $('a.tc-breadcrumb'),
      category = '';

  crumbs.each(function (idx, crumb) {
    if (idx === (crumbs.length - 1)) {
      category = $(crumb).children().first().html();
    }
  });

  var product = {
    name: name.replace(/\s+/g, ' '),
    category: category || '',
    price: '£' + $(price).attr('content'),
    description: description,
    retailer: 'evans',
    image: decodeURI($(image).attr('src')) || ''
  };

  callback(null, product);
}
