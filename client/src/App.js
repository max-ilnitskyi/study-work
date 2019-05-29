import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import store from './store';

import Page from './components/Page';
import PageContentMain from './components/PageContentMain';
import PageContentAbout from './components/PageContentAbout';
import PageContentNotes from './components/PageContentNotes';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Page>
            <Helmet>
              <title>Study work</title>
            </Helmet>
            <Switch>
              <Route exact path="/" component={PageContentMain} />
              <Route path="/about" component={PageContentAbout} />
              <Route path="/notes" component={PageContentNotes} />
            </Switch>
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
