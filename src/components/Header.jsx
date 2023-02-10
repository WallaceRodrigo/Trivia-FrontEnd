import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const HashEmail = md5(gravatarEmail).toString();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${HashEmail}` } data-testid="header-profile-picture" alt="gravatar" />
        <h1 data-testid="header-player-name">{ name }</h1>
        <h1 data-testid="header-score">0</h1>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  /* score: PropTypes.number.isRequired, */
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Header);
