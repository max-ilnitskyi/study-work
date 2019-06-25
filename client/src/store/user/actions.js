import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';

const { SET_USER } = constats.actionTypes;

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const fetchUser = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.get(`/api/user`, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(setUser(data.user));
    });
  };
};

export const registrateUser = (newUser, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(`/api/user/registrate`, newUser, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(setUser(data.user));
    });
  };
};

export const loginUser = (userToLogin, onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(`/api/user/login`, userToLogin, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(setUser(data.user));
    });
  };
};

export const logoutUser = (onSuccess, onError) => {
  return dispatch => {
    fetchJSON.post(`/api/user/logout`, {}, data => {
      if (!data.ok) {
        if (onError) onError(data.message);
        return;
      }

      if (onSuccess) onSuccess();
      dispatch(setUser(null));
    });
  };
};
