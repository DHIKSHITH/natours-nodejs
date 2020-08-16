import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Tours from './components/tours/Tours';
import Tour from './components/tour/Tour';

import store from './store';
import { Provider } from 'react-redux';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Tours} />
          <Switch>
            <Route exact path="/tours/:id" component={Tour} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
