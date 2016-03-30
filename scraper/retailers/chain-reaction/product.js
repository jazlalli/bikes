var cheerio = require('cheerio');

module.exports = scrape;

function scrape(responseBody, callback) {
  var product = {};
  var $ = cheerio.load(responseBody),
      name = $.html('meta[itemprop="name"]'),
      price = $('span.crcPDPPriceHidden').html().replace('\n', ''),
      description = $('#crcPDPComponentDescription p').first().html(),
      image = $('img.s7_zoomviewer_staticImage').attr('src'),
      crumbs = $('div.breadcrumb ul li'),
      category = '';

  crumbs.each(function (idx, crumb) {
    if (idx === (crumbs.length - 3)) {
      category = $(crumb).children().first().html();
    }
  });

  var product = {
    name: $(name).attr('content'),
    category: decodeURI(category) || '',
    price: '£' + decodeURI(price),
    description: decodeURI(description),
    retailer: 'chain-reaction',
    image: decodeURI(image) || ''
  };

  callback(null, product);
}
