import constats from '../../constants';

const { SET_USER, SET_USER_FETCH_STATE } = constats.actionTypes;

const defaultStore = {
  user: null,
  userFetchState: null // Can be: pending/error/success
};

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    // Set user data object from action.payload
    case SET_USER:
      return { ...store, user: action.payload };

    // Set fetch state from action.payload
    case SET_USER_FETCH_STATE:
      return { ...store, userFetchState: action.payload };

    default:
      return store;
  }
};

export default reducer;
