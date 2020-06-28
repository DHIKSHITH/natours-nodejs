const mongoose = require('mongoose');
const slugify = require('slugify');

const tourschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: String,
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourschema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//document middleware it runs before.save() and  .create()
tourschema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourschema.pre('save', function(next) {
//   console.log('will save');
//   next();
// });
// tourschema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
tourschema.pre(/^find/, function(next) {
  // tourschema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourschema.post(/^find/, function(docs, next) {
  console.log(`query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);

  next();
});

//aggregation middleware
tourschema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourschema);

module.exports = Tour;
