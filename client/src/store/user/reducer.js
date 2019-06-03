import constats from '../../constants';

const { SET_USER } = constats.actionTypes;

const defaultStore = {
  user: null
};

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;

    default:
      return store;
  }
};

export default reducer;
