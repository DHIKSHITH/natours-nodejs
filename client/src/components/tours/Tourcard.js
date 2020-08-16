import React, { Fragment } from 'react';

import moment from 'react-moment';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Tourcard = ({
  tour: {
    name,
    duration,
    description,
    ratingsAverage,
    ratingsQuantity,
    maxGroupSize,
    difficulty,
    price,
    summary,
    startLocation,
    locations,
    startDates,
    id
  }
}) => {
  return (
    <Fragment>
      <div class="card">
        <div class="card__header">
          <div class="card__picture">
            <div class="card__picture-overlay">&nbsp;</div>
            {/* <img
              src="img/tour-1-cover.jpg"
              alt="Tour 1"
              class="card__picture-img"
            /> */}
          </div>

          <h3 class="heading-tertirary">
            <span>{name}</span>
          </h3>
        </div>

        <div class="card__details">
          <h4 class="card__sub-heading">Easy {duration}-day tour</h4>
          <p class="card__text">{summary}</p>
          <div class="card__data">
            {/* <svg class="card__icon">
              <use xlink:href="img/icons.svg#icon-map-pin"></use>
            </svg> */}
            <span>{startLocation.description}</span>
          </div>
          <div class="card__data">
            {/* <svg class="card__icon">
              <use xlink:href="img/icons.svg#icon-calendar"></use>
            </svg> */}
            <span>{<Moment format="MMMM/YY">{startDates[0]}</Moment>}</span>
          </div>
          <div class="card__data">
            {/* <svg class="card__icon">
              <use xlink:href="img/icons.svg#icon-flag"></use>
            </svg> */}
            <span>{locations.length} stops</span>
          </div>
          <div class="card__data">
            {/* <svg class="card__icon">
              <use xlink:href="img/icons.svg#icon-user"></use>
            </svg> */}
            <span>{maxGroupSize} people</span>
          </div>
        </div>

        <div class="card__footer">
          <p>
            <span class="card__footer-value">${price}</span>
            <span class="card__footer-text">per person</span>
          </p>
          <p class="card__ratings">
            <span class="card__footer-value">{ratingsAverage}</span>
            <span class="card__footer-text">rating ({ratingsQuantity})</span>
          </p>
          <Link to={`/tours/${id}`} class="btn btn--green btn--small">
            Details
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Tourcard;
