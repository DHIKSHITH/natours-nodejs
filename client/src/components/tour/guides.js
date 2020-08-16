import React, { Fragment } from 'react';

const TourDesc = ({ guide }) => {
  return (
    <Fragment>
      <div class="overview-box__detail">
        {/* <img
          src="img/users/user-19.jpg"
          alt="Lead guide"
          class="overview-box__img"
        /> */}
        <span class="overview-box__label">{guide.role}</span>
        <span class="overview-box__text">{guide.name}</span>
      </div>
    </Fragment>
  );
};

export default TourDesc;
