import React from 'react';
import PropTypes from 'prop-types';

class LogoHeader extends React.Component {
  render() {
    return <img className="logo-header" src={this.props.logoLink} alt="logo" />;
  }
}

LogoHeader.propTypes = {
  logoLink: PropTypes.string.isRequired
};

export default LogoHeader;
