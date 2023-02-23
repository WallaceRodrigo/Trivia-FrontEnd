/* eslint-disable max-len */
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { AiTwotoneStar } from 'react-icons/ai';
import { connect } from 'react-redux';
import './styles/header.css';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const HashEmail = md5(gravatarEmail).toString();
    return (
      <div className="headerDiv">
        <img src={ `https://www.gravatar.com/avatar/${HashEmail}` } data-testid="header-profile-picture" alt="gravatar" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <AiTwotoneStar
          style={
            { color: '#F9BA18', position: 'relative', top: '-2px', margin: '0px 5px', fontSize: '30px' }
          }
        />
        <h2 data-testid="header-score" style={ { margin: '0px 10px' } }>
          {
            `Pontos: ${score}`
          }

        </h2>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Header);
