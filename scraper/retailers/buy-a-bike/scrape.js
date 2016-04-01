var cheerio = require('cheerio');

module.exports = scrape;

function scrape(responseBody, callback) {
  var product = {};
  var $ = cheerio.load(responseBody),
      name = $('h1').html(),
      price = $('span.ProductPrice.VariationProductPrice').html(),
      description = $('div.ProductDescriptionContainer.prodAccordionContent div p').text(),
      image = $('div.zoomie img').attr('src');

  var product = {
    name: name.trim(),
    price: '£' + price,
    description: description,
    retailer: 'buy-a-bike',
    image: decodeURI($(image).attr('src')) || ''
  };

  callback(null, product);
}
