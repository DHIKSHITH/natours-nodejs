import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, auth: { isAuthenticated } }) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = data;
  const onChangeHandler = e => {
    e.preventDefault();
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <main class="main">
      <div class="login-form">
        <h2 class="heading-secondary ma-bt-lg">Log into your account</h2>
        <form class="form form--login" onSubmit={e => onSubmit(e)}>
          <div class="form__group">
            <label class="form__label" for="email">
              Email address
            </label>
            <input
              class="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              value={email}
              onChange={e => onChangeHandler(e)}
            />
          </div>
          <div class="form__group ma-bt-md">
            <label class="form__label" for="password">
              Password
            </label>
            <input
              class="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minlength="8"
              value={password}
              onChange={e => onChangeHandler(e)}
            />
          </div>
          <div class="form__group">
            <button class="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
