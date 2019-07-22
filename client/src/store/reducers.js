import { combineReducers } from 'redux';

// Import reducers
import stories from './stories/reducer';
import user from './user/reducer';

// Combine redusers
const reducer = combineReducers({
  stories,
  user
});

export default reducer;
