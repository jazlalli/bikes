var cheerio = require('cheerio');

module.exports = scrape;

function scrape(responseBody, callback) {
  var product = {};
  var $ = cheerio.load(responseBody),
      name = $('h1').html(),
      price = $('span.ProductPrice.VariationProductPrice').html(),
      description = $('div.ProductDescriptionContainer.prodAccordionContent').html(),
      image = $('div.zoomie img').attr('src');

  var product = {
    name: decodeURI(name.trim()),
    price: '£' + price,
    description: description,
    retailer: 'evans',
    image: decodeURI($(image).attr('src')) || ''
  };

  console.log(product);

  callback(null, product);
}
