import constats from '../../constants';

// import store from '../index';
// import { usersList } from './selectors';

const { SET_USER } = constats.actionTypes;

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const fetchUser = login => {
  return dispatch => {
    fetch(`/api/users/${login}`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        console.log('---response fetchUser1: ', response); //temp
        if (!response.ok) {
          throw new Error(`Response is not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        dispatch(setUser(data));
        console.log('---response fetchUser2: ', data); //temp
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error fetchUser: ', err);
      });
  };
};
