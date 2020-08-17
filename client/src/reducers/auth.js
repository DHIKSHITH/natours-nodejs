import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT
} from '../actions/type';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: localStorage.setItem('token', payload.token),
        isAuthenticated: true,
        loading: false,
        user: payload.data
      };
    case LOGOUT:
      return {
        ...state,
        token: localStorage.removeItem('token'),
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
