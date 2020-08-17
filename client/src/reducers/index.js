import { combineReducers } from 'redux';
import tours from './tours';
import auth from './auth';

export default combineReducers({
  auth,
  tours
});
