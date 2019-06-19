import React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';

import PageContentWrap from '../PageContentWrap';

import {
  headTitleAbout as pageTitle,
  pageTextAbout as pageText
} from '../../data';

class PageContentAbout extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <p>{pageText}</p>
      </PageContentWrap>
    );
  }
}

export default PageContentAbout;
