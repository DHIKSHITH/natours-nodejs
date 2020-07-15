/*eslint-disable*/
import axios from 'axios';

import { showAlert } from './alerts';
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/user/updatemypassword'
        : 'http://127.0.0.1:3000/api/v1/user/updateme';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', ` ${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
