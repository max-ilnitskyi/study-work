import React from 'react';

// import MainContentWrapper from './views/MainContentWrapper';
import Container from '../Container';

class MainContent extends React.Component {
  render() {
    return (
      <Container
        wrapClassName="main-content-wrap"
        className="main-content-container"
      >
        <div> Hello! It's main content</div>
      </Container>
    );
  }
}

export default MainContent;
