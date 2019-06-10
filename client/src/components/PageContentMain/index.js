import React from 'react';
// import styled from 'styled-components';

import PageContentWrap from '../PageContentWrap';

import { pageTextMain as pageText } from '../../data';

class PageContentMain extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <p>{pageText}</p>
      </PageContentWrap>
    );
  }
}

export default PageContentMain;
