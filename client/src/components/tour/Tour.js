import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTour } from '../../actions/tours';
import Guides from './guides';
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
          <section class="section-header">
            <div class="heading-box">
              <h1 class="heading-primary">
                <span>{tour.data.name}</span>
              </h1>
              <div class="heading-box__group">
                <div class="heading-box__detail">
                  {/* <svg class="heading-box__icon">
              <use xlink:href="img/icons.svg#icon-clock"></use>
            </svg> */}
                  <span class="heading-box__text">
                    {tour.data.duration} days
                  </span>
                </div>
                <div class="heading-box__detail">
                  {/* <svg class="heading-box__icon">
              <use xlink:href="img/icons.svg#icon-map-pin"></use>
            </svg> */}
                  <span class="heading-box__text">
                    {tour.data.startLocation.description}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section class="section-description">
            <div class="overview-box">
              <div>
                <div class="overview-box__group">
                  <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div class="overview-box__detail">
                    {/* <svg class="overview-box__icon">
                <use xlink:href="img/icons.svg#icon-calendar"></use>
              </svg> */}
                    <span class="overview-box__label">Next date</span>
                    <span class="overview-box__text">
                      <Moment format="MMMM/YY">
                        {tour.data.startDates[0]}
                      </Moment>
                    </span>
                  </div>
                  <div class="overview-box__detail">
                    {/* <svg class="overview-box__icon">
                <use xlink:href="img/icons.svg#icon-trending-up"></use>
              </svg> */}
                    <span class="overview-box__label">Difficulty</span>
                    <span class="overview-box__text">
                      {tour.data.difficulty}
                    </span>
                  </div>
                  <div class="overview-box__detail">
                    {/* <svg class="overview-box__icon">
                <use xlink:href="img/icons.svg#icon-user"></use>
              </svg> */}
                    <span class="overview-box__label">Participants</span>
                    <span class="overview-box__text">
                      {tour.data.maxGroupSize} people
                    </span>
                  </div>
                  <div class="overview-box__detail">
                    {/* <svg class="overview-box__icon">
                <use xlink:href="img/icons.svg#icon-star"></use>
              </svg> */}
                    <span class="overview-box__label">Rating</span>
                    <span class="overview-box__text">
                      {tour.data.ratingsAverage} / 5
                    </span>
                  </div>
                </div>

                <div class="overview-box__group">
                  <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>

                  {/* <img
                src="img/users/user-19.jpg"
                alt="Lead guide"
                class="overview-box__img"
              /> */}

                  {tour.data.guides.map(guide => (
                    <Guides guide={guide} />
                  ))}
                </div>
              </div>
            </div>

            <div class="description-box">
              <h2 class="heading-secondary ma-bt-lg">
                About the park camper tour
              </h2>
              <p class="description__text">{tour.data.description}</p>
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
