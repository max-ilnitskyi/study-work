import { combineReducers } from 'redux';

import notes from './notes/reducer';
import user from './user/reducer';

const reducer = combineReducers({
  notes,
  user
});

export default reducer;
