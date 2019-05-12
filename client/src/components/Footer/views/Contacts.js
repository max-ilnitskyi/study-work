import React from 'react';
import PropTypes from 'prop-types';

class Contacts extends React.Component {
  render() {
    return (
      <ul className="footer-contacts">
        {this.props.contacts.map((contact, i) => (
          <li className="footer-contacts__item" key={contact.name}>
            <p className={'footer-contacts__text ' + contact.class}>
              {contact.text}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired
    })
  )
};

export default Contacts;
