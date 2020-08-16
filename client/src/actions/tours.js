import axios from 'axios';
import { GET_TOURS, GET_TOUR } from './type';

export const getTours = () => async disptach => {
  try {
    const tours = await axios.get('/api/v1/tours');
    disptach({
      type: GET_TOURS,
      payload: tours.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTour = id => async disptach => {
  try {
    const tour = await axios.get(`/api/v1/tours/${id}`);

    disptach({
      type: GET_TOUR,
      payload: tour.data
    });
  } catch (err) {
    console.log(err);
  }
};
