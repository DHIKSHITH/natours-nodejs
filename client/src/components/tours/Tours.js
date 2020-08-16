import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTours } from '../../actions/tours';
import Tour from './Tourcard';

const Overview = ({ getTours, tours: { tours, loading } }) => {
  useEffect(() => {
    getTours();
  }, []);

  return loading || tours === null ? (
    'Loading...'
  ) : (
    <Fragment>
      <main className="main">
        <div className="card-container">
          {loading === false && tours.data.map(tour => <Tour tour={tour} />)}
        </div>
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  tours: state.tours
});

export default connect(mapStateToProps, { getTours })(Overview);
