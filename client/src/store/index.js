import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

let middlewares = [thunk];

// dinamic imports of middlewares in 'development' mode
if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true
  });
  middlewares = [...middlewares, logger];
}

let enhancers = [applyMiddleware(...middlewares)];

// dinamic imports of enhancers in 'development' mode
if (process.env.NODE_ENV !== 'production') {
  const { devToolsEnhancer } = require('redux-devtools-extension');
  enhancers = [...enhancers, devToolsEnhancer()];
}

const store = createStore(reducer, compose(...enhancers));

export default store;
