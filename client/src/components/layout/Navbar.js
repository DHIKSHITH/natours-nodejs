import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  return (
    <Fragment>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
          <form className="nav__search">
            <button className="nav__search-btn">
              <svg>
                <use xlinkHref="/img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search tours"
              className="nav__search-input"
            />
          </form>
        </nav>
        <div className="header__logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>

        <nav className="nav nav--user">
          {isAuthenticated ? (
            <Fragment>
              <Link to="/booking" className="nav__el">
                My bookings
              </Link>
              <Link to="/profile" className="nav__el">
                <img
                  src={`/img/users/${user.photo}`}
                  alt="User photo"
                  className="nav__user-img"
                />
                <span>{user.name.trim().split(' ')[0]}</span>
              </Link>
              <Link to="/login" className="nav__el" onClick={logout}>
                Log Out
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/login" className="nav__el">
                Log in
              </Link>
              <button className="nav__el nav__el--cta">Sign up</button>
            </Fragment>
          )}
        </nav>
      </header>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
