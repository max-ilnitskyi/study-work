import React from 'react';
// import { Provider } from 'react-redux';

// components imports
// import store from './store';

import MainPage from './components/MainPage';

class App extends React.Component {
  // render() {
  //   return (
  //     <Provider store={store}>
  //       {/* main components */}
  //     </Provider>
  //   );
  // }
  render() {
    return <MainPage />;
  }
}

export default App;
