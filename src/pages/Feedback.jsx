import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { name, gravatarEmail, score, assertions, history } = this.props;
    const HashEmail = md5(gravatarEmail).toString();
    const three = 3;
    return (
      <div>
        <h1>Feedback</h1>
        <img src={ `https://www.gravatar.com/avatar/${HashEmail}` } data-testid="header-profile-picture" alt="gravatar" />
        <h1 data-testid="header-player-name">{ name }</h1>
        <h1 data-testid="header-score">{ score }</h1>
        <h2 data-testid="feedback-text">
          {
            assertions >= three ? 'Well Done!' : 'Could be better...'
          }
        </h2>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
