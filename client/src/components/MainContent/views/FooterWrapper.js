import React from 'react';

class FooterWrapper extends React.Component {
  render() {
    return (
      <footer className="footer-wrap" ref={this.header}>
        {this.props.children}
      </footer>
    );
  }
}

export default FooterWrapper;
