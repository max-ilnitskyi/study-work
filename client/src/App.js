import React from 'react';
import { Provider } from 'react-redux';

// components imports
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* main components */}
      </Provider>
    );
  }
}

export default App;
