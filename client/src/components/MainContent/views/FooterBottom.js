import React from 'react';
import PropTypes from 'prop-types';

import Socials from './Socials';

class FooterBottom extends React.Component {
  render() {
    return (
      <div className="footer-bottom">
        <div className="footer-bottom__socials">
          <Socials socials={this.props.socials} />
        </div>
        <div className="footer-bottom__copyright">
          <p className="copyright-text">{this.props.copyrightText}</p>
        </div>
      </div>
    );
  }
}

FooterBottom.propTypes = {
  copyrightText: PropTypes.string,
  socials: PropTypes.array
};

export default FooterBottom;
