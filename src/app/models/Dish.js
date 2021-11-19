const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Dish = new Schema({
  name: {type: String, required: true},
  description: {type: String, maxLength: 600},
  image: {type: String, maxLength: 255},
  slug: { type: String, slug: 'name', unique: true},
  videoId: {type: String, required: true},
  level: {type: String, maxLength: 255},
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