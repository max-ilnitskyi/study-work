import React from 'react';
import PropTypes from 'prop-types';

import LogoFooter from './LogoFooter';
import FooterMainNav from './FooterMainNav';

class FooterHead extends React.Component {
  render() {
    return (
      <div className="footer-head">
        <LogoFooter logoLink={this.props.logoLink} />
        <FooterMainNav links={this.props.links} />
      </div>
    );
  }
}

FooterHead.propTypes = {
  logoLink: PropTypes.string,
  links: PropTypes.array
};

export default FooterHead;
