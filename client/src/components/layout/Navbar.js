import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
          <form className="nav__search">
            <button className="nav__search-btn">
              {/* <svg>
                <use xlinkHref="../../img/icons.svg#icon-search"></use>
              </svg> */}
            </button>
            <input
              type="text"
              placeholder="Search tours"
              className="nav__search-input"
            />
          </form>
        </nav>
        <div className="header__logo">
          {/* <img src="../../img/logo-white.png" alt="Natours logo" /> */}
        </div>
        <nav className="nav nav--user">
          <Link to="/booking" className="nav__el">
            My bookings
          </Link>
          <Link to="/profile" className="nav__el">
            {/* <img
              src="../../img/user.jpg"
              alt="User photo"
              className="nav__user-img"
            /> */}
            <span>Jonas</span>
          </Link>

          <button className="nav__el">Log in</button>
          <button className="nav__el nav__el--cta">Sign up</button>
        </nav>
      </header>
    </Fragment>
  );
};

export default Navbar;
