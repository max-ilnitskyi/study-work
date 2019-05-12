import React from 'react';
import PropTypes from 'prop-types';

class FooterMainNav extends React.Component {
  render() {
    return (
      <nav className="footer-main-nav">
        <ul className="footer-main-nav__list">
          {this.props.links.map((link, i) => (
            <li className="footer-main-nav__item" key={i}>
              <a className="footer-main-nav__link" href={link.address}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

FooterMainNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired
    })
  )
};

export default FooterMainNav;
