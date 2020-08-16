import { GET_TOURS, GET_TOUR } from '../actions/type';

const initialState = {
  tours: null,
  tour: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TOURS:
      return {
        ...state,
        tours: payload,
        loading: false
      };
    case GET_TOUR:
      return {
        ...state,
        tours: null,
        tour: payload,
        loading: false
      };
    default:
      return state;
  }
}
