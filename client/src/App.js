import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import store from './store';

import Page from './components/Page';
import MainPageContent from './components/MainPageContent';
import AboutPageContent from './components/AboutPageContent';
import NotesPageContent from './components/NotesPageContent';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Page>
            <Switch>
              <Route exact path="/" component={MainPageContent} />
              <Route path="/about" component={AboutPageContent} />
              <Route path="/notes" component={NotesPageContent} />
            </Switch>
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
