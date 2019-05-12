import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: props.user.photo,
      avatarCover: props.avatarCover
    };
  }

  render() {
    const { name, email } = this.props.user;
    const signoutLinkAdress = this.props.signoutLinkAdress;

    return (
      <div className="profile">
        <div className="profile__text-part">
          <p className="profile__name">{name}</p>
          <p className="profile__mail">{email}</p>
        </div>
        <div className="profile__avatar-wrap">
          <img
            className="profile__avatar"
            src={this.state.photo}
            alt="avatar"
            onError={this.handleImgError}
          />
        </div>

        {/* not seen for tablets and below */}
        {signoutLinkAdress !== null ? (
          <a className="profile__singout" href={signoutLinkAdress}>
            <span className="visually-hidden" style={{ fontSize: 0 }}>
              Sign Out
            </span>
          </a>
        ) : null}
      </div>
    );
  }

  handleImgError = () => {
    if (this.state.avatarCover && this.state.avatarCover !== this.state.photo) {
      this.setState({ photo: this.state.avatarCover });
    }
  };
}

Profile.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  signoutLinkAdress: PropTypes.string,
  avatarCover: PropTypes.string
};

export default Profile;
