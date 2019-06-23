import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';

const { SET_USER } = constats.actionTypes;

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const fetchUser = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.get(
      `/api/user`,
      user => {
        if (typeof onSuccess === 'function') onSuccess(user);
        dispatch(setUser(user));
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};

export const registrateUser = (newUser, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(
      `/api/user/registrate`,
      newUser,
      data => {
        if (typeof onSuccess === 'function') onSuccess(data);
        dispatch(fetchUser(data));
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};

export const loginUser = (userToLogin, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(
      `/api/user/login`,
      userToLogin,
      data => {
        if (typeof onSuccess === 'function') onSuccess(data);
        dispatch(fetchUser(data));
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};

export const logoutUser = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(
      `/api/user/logout`,
      {},
      data => {
        if (typeof onSuccess === 'function') onSuccess(data);
        dispatch(setUser(null));
      },
      err => {
        if (typeof onError === 'function') onError(err);
      }
    );
  };
};
