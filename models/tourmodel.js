const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./usermodel');//for embedding
// const validator = require('validator');

const tourschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'a tour name must have less or equal to 40 characters'],
      minlength: [10, 'a tour name must have more or equal to 10 characters']
      // validate: [validator.isAlpha, 'only charaters'] //this is used from validate.js from git hub but it is not useful bcoz it checks fot space also if there is any space it throws err
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
      required: [true, 'a tour should have defficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either :easy medium or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1'],
      max: [5, 'must be below 5']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          //THIS ONLY POINTS TO CURRENT DOC ON NEW DOCUMENT CREATION NOT ON UPDATE
          return val < this.price; //to check if price is less than discount
        },
        message: 'discount price ({VALUE}) should be below the regular price'
      }
    },
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
    },
    startLocation: {
      //geo json
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourschema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

//virtual populate
tourschema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

//document middleware it runs before.save() and  .create() NOT FOR UPDATE
tourschema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//EMBEDDING[IT IS USED FOR READ MOST OF THE TIME]
// tourschema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

//QUERY MIDDLEWARE
tourschema.pre(/^find/, function(next) {
  // tourschema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourschema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
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
