import React from 'react';

// import FooterWrapper from './views/FooterWrapper';
import Container from '../Container';

class Header extends React.Component {
  render() {
    return (
      <Container wrapClassName="header-wrap" className="header-container">
        <div> Hello! It's header</div>
      </Container>
    );
  }
}

export default Header;
