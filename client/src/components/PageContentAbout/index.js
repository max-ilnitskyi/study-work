import React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';

import PageContentWrap from '../PageContentWrap';

class PageContentAbout extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>About - Study work</title>
        </Helmet>
        <p>This application awesome</p>
      </PageContentWrap>
    );
  }
}

export default PageContentAbout;
