const mongoose = require('mongoose');

const tourschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have group size']
  },
  difficulty: {
    type: String,
    required: [true, 'a tour should have defficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'a tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});
const Tour = mongoose.model('Tour', tourschema);

module.exports = Tour;
