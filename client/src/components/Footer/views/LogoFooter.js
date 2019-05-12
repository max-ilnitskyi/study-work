import React from 'react';
import PropTypes from 'prop-types';

class LogoFooter extends React.Component {
  render() {
    return <img className="logo-footer" src={this.props.logoLink} alt="logo" />;
  }
}

LogoFooter.propTypes = {
  logoLink: PropTypes.string.isRequired
};

export default LogoFooter;
