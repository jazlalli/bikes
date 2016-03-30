var cheerio = require('cheerio');

module.exports = harvest;

function harvest(responseBody, callback) {
  var products = [];
  var $ = cheerio.load(responseBody);
      links = $('li.description > a');

  links.each(function (idx, link) {
    var item = $(link);
    var product = {
      retailer: 'chain-reaction',
      name: item.html().replace(/\r?\n|\r/gm, ' '),
      url: 'http://www.chainreactioncycles.com' + item.attr('href')
    };

    products.push(product);
  });

  callback(null, products);
}
