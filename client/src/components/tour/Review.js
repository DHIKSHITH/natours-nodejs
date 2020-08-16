import React from 'react';

const Review = ({ review }) => {
  const r = [1, 2, 3, 4, 5];
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`/img/users/${review.user.photo}`}
          alt="Jim Brown"
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
        {r.map((rating, index) => (
          <svg
            key={index}
            className={`reviews__star reviews__star--${
              review.rating >= rating ? 'active' : 'inactive'
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Review;
