import React from 'react';
import PropTypes from 'prop-types';

class FooterSecondaryNav extends React.Component {
  render() {
    return (
      <nav className="footer-secondary-nav">
        <ul className="footer-secondary-nav__list">
          {this.props.links.map((link, i) => (
            <li className="footer-secondary-nav__item" key={i}>
              <a className="footer-secondary-nav__link" href={link.address}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

FooterSecondaryNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired
    })
  )
};

export default FooterSecondaryNav;
