import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTour } from '../../actions/tours';
import Guides from './guides';
import Review from './Review';
import Moment from 'react-moment';

const Tour = ({ getTour, tours: { loading, tour }, match }) => {
  useEffect(() => {
    getTour(match.params.id);
  }, [getTour]);
  return (
    <Fragment>
      {tour === null || loading === true ? (
        'Loading...'
      ) : (
        <Fragment>
          <section className="section-header">
            <div className="header__hero">
              <div className="header__hero-overlay "></div>
              <img
                className="header__hero-img"
                src={`/img/tours/${tour.data.imageCover}`}
                alt="tour"
              />
            </div>
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tour.data.name}</span>
              </h1>
              <div className="heading-box__group">
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHhref="/img/icons.svg#icon-clock"></use>
                  </svg>
                  <span className="heading-box__text">
                    {tour.data.duration} days
                  </span>
                </div>
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span className="heading-box__text">
                    {tour.data.startLocation.description}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="section-description">
            <div className="overview-box">
              <div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                    </svg>
                    <span className="overview-box__label">Next date</span>
                    <span className="overview-box__text">
                      <Moment format="MMMM/YY">
                        {tour.data.startDates[0]}
                      </Moment>
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                    </svg>
                    <span className="overview-box__label">Difficulty</span>
                    <span className="overview-box__text">
                      {tour.data.difficulty}
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-user"></use>
                    </svg>
                    <span className="overview-box__label">Participants</span>
                    <span className="overview-box__text">
                      {tour.data.maxGroupSize} people
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-star"></use>
                    </svg>
                    <span className="overview-box__label">Rating</span>
                    <span className="overview-box__text">
                      {tour.data.ratingsAverage} / 5
                    </span>
                  </div>
                </div>

                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">
                    Your tour guides
                  </h2>
                  {tour.data.guides.map(guide => (
                    <Guides guide={guide} key={guide._id} />
                  ))}
                </div>
              </div>
            </div>

            <div className="description-box">
              <h2 className="heading-secondary ma-bt-lg">
                About the park camper tour
              </h2>
              <p className="description__text">{tour.data.description}</p>
            </div>
          </section>
          <section className="section-pictures">
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--1"
                src={`/img/tours/${tour.data.images[0]}`}
                alt="The Park Camper Tour 1"
              />
            </div>
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--2"
                src={`/img/tours/${tour.data.images[1]}`}
                alt="The Park Camper Tour 1"
              />
            </div>
            <div className="picture-box">
              <img
                className="picture-box__img picture-box__img--3"
                src={`/img/tours/${tour.data.images[2]}`}
                alt="The Park Camper Tour 1"
              />
            </div>
          </section>
          <section className="section-reviews">
            <div className="reviews">
              {tour.data.reviews.map(review => (
                <Review review={review} key={review._id} />
              ))}
            </div>
          </section>
          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img
                  src="/img/logo-white.png"
                  alt="Natours logo"
                  className=""
                />
              </div>
              <img
                src={`/img/tours/${tour.data.images[0]}`}
                alt=""
                className="cta__img cta__img--1"
              />
              <img
                src={`/img/tours/${tour.data.images[1]}`}
                alt=""
                className="cta__img cta__img--2"
              />

              <div className="cta__content">
                <h2 className="heading-secondary">What are you waiting for?</h2>
                <p className="cta__text">
                  {tour.data.duration} days. 1 adventure. Infinite memories.
                  Make it yours today!
                </p>
                <button className="btn btn--green span-all-rows">
                  Book tour now!
                </button>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  tours: state.tours
});

export default connect(mapStateToProps, { getTour })(Tour);
