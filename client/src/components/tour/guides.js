import React, { Fragment } from 'react';

const TourDesc = ({ guide }) => {
  return (
    <Fragment>
      <div className="overview-box__detail">
        <img
          src={`/img/users/${guide.photo}`}
          alt="Lead guide"
          className="overview-box__img"
        />
        <span className="overview-box__label">{guide.role}</span>
        <span className="overview-box__text">{guide.name}</span>
      </div>
    </Fragment>
  );
};

export default TourDesc;
