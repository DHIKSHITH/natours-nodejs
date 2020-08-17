import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Tours from './components/tours/Tours';
import Tour from './components/tour/Tour';
import Login from './components/auth/Login';

import store from './store';
import { Provider } from 'react-redux';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Tours} />
          <Switch>
            <Route exact path="/tours/:id" component={Tour} />
            <Route exact path="/login" component={Login} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
