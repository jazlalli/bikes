var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
  'retailer': String,
  'product': String,
  'url': String,
  'date': Date
});

var page = mongoose.model('Page', pageSchema);

module.exports = page;
