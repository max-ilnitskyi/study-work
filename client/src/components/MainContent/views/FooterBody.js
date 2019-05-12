import React from 'react';
import PropTypes from 'prop-types';

import Contacts from './Contacts';
import FooterSecondaryNav from './FooterSecondaryNav';

class FooterBody extends React.Component {
  render() {
    return (
      <div className="footer-body">
        <div className="footer-body__contacts">
          <Contacts contacts={this.props.contacts} />
        </div>
        <div className="footer-body__nav">
          <FooterSecondaryNav links={this.props.links} />
        </div>
      </div>
    );
  }
}

FooterBody.propTypes = {
  links: PropTypes.array,
  contacts: PropTypes.array
};

export default FooterBody;
