var mongoose = require('mongoose');

var bikeSchema = new mongoose.Schema({
  'name': String,
  'price': String,
  'category': String,
  'description': String,
  'retailer': String,
  'link': String,
  'image': String
});

var bike = mongoose.model('Bike', bikeSchema);

module.exports = bike;
