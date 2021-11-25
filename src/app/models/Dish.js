const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Dish = new Schema({
  name: {type: String, required: true},
  description: {type: String, maxLength: 600},
  image: {type: Buffer, required: true},
  price: {type: Number},
  type: {type: String, required: true},
  imageType: { type: String, required: true },
  slug: { type: String, slug: 'name', unique: true},
},{
  timestamps: true,
});
// Add plugin
mongoose.plugin(slug);
Dish.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Dish', Dish);