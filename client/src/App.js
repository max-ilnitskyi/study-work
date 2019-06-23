import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Page from './components/Page';
import PageContentMain from './components/PageContentMain';
import PageContentAbout from './components/PageContentAbout';
import PageContentNotes from './components/PageContentNotes';
import PageRegistration from './components/PageRegistration';
import PageLogin from './components/PageLogin';
import NotFound from './components/NotFound';
import Messages from './components/Messages';
import { GlobalStyle } from './styles';

import store from './store';
import { headTitleMain as headTitle } from './data';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Page>
            <Helmet>
              <title>{headTitle}</title>
            </Helmet>
            <GlobalStyle />
            <Switch>
              <Route exact path="/" component={PageContentMain} />
              <Route path="/about" component={PageContentAbout} />
              <Route path="/notes" component={PageContentNotes} />
              <Route path="/registration" component={PageRegistration} />
              <Route path="/login" component={PageLogin} />
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
