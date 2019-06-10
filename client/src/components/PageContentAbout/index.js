import React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';

import PageContentWrap from '../PageContentWrap';
import Button from '../Button';

class PageContentAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { outline: false };
  }

  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>About - Study work</title>
        </Helmet>
        <p>This application awesome</p>
        <Button outline={this.state.outline} onClick={this.handLeButtonClick}>
          click me!
        </Button>
      </PageContentWrap>
    );
  }

  handLeButtonClick = () => {
    this.setState({ outline: !this.state.outline });
  };
}

export default PageContentAbout;
