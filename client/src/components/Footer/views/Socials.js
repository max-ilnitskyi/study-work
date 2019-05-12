import React from 'react';
import PropTypes from 'prop-types';

class Socials extends React.Component {
  render() {
    return (
      <ul className="footer-socials">
        {this.props.socials.map((social, i) => (
          <li className="footer-socials__item" key={social.name}>
            <a
              className={'footer-socials__link ' + social.class}
              href={social.link}
              aria-label={social.name}
            >
              {null}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

Socials.propTypes = {
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};

export default Socials;
