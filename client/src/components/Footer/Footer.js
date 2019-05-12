import React from 'react';

// import FooterWrapper from './views/FooterWrapper';
import Container from '../Container';

class Footer extends React.Component {
  render() {
    return (
      <Container wrapClassName="footer-wrap" className="footer-container">
        <div> Hello! It's footer</div>
      </Container>
    );
  }
}

export default Footer;
