import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import store from './store';

import Page from './components/Page';
import PageContentMain from './components/PageContentMain';
import PageContentAbout from './components/PageContentAbout';
import PageContentNotes from './components/PageContentNotes';
import PageRegistration from './components/PageRegistration';
import NotFound from './components/NotFound';
import Messages from './components/Messages';

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
              <Route path="/registration" component={PageRegistration} />
              <Route component={NotFound} />
            </Switch>
            <Messages />
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
