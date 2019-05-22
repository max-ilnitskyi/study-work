import constats from '../../constants';

// import store from '../index';
// import { usersList } from './selectors';

const { SET_NOTES } = constats.actionTypes;

export const setNotes = notes => ({
  type: SET_NOTES,
  payload: notes
});

let delay = 500;
export const fetchNotes = () => {
  return dispatch => {
    fetch(`/api/notes`)
      .then(response => {
        console.log('---response 1: ', response); //temp
        return response.json();
      })
      .then(data => {
        // TODO: chek data for success
        // if (!data.success) return Promise.reject(new Error(data.message));

        // TODO: wrap respons with meta-data, move notes to data.notes
        dispatch(setNotes(data));

        console.log('---response 2: ', data); //temp

        delay = 500;
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production')
          console.log('---error fetchNotes: ', err);

        if (delay !== null) {
          setTimeout(() => {
            dispatch(fetchNotes());
          }, delay);
          delay = delay * 2;
        }
      });
  };
};
