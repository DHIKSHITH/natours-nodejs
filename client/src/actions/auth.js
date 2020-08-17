import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './type';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/v1/user/protect');
    console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const user = { email, password };

    const res = await axios.post('/api/v1/user/login', user);
    console.log(res.data.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.message;
    // if(errors){
    //     disptach ()
    // }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const logout = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/user/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
};
