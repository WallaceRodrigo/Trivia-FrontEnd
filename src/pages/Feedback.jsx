/* eslint-disable max-len */
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const HashEmail = md5(gravatarEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${HashEmail}`;
    const rankingLocalStorage = { name, score, picture: gravatarImg };

    const ranking = localStorage.getItem('ranking');
    const rankingValidation = ranking === null ? [] : JSON.parse(ranking);

    rankingValidation.push(rankingLocalStorage);

    localStorage.setItem('ranking', JSON.stringify(rankingValidation));
  }

  render() {
    const { name, gravatarEmail, score, assertions, history } = this.props;
    const HashEmail = md5(gravatarEmail).toString();
    const three = 3;
    return (
      <div className="feedbackContainer">
        <div className="feedbackDiv">
          <img
            src={ `https://www.gravatar.com/avatar/${HashEmail}` }
            data-testid="header-profile-picture"
            alt="gravatar"
            className={ assertions >= three ? 'greatImg' : 'badImg' }
          />
          {
            assertions >= three ? <h2 className="great">{ `Mandou bem ${name}!` }</h2>
              : <h2 className="bad">{ `Podia ser melhor ${name}...` }</h2>
          }
          <p data-testid="feedback-total-question">{ `Você acertou ${assertions} questões!` }</p>
          <p data-testid="feedback-total-score">{ `Fez um total de ${score} pontos` }</p>
        </div>
        <div className="feedbackButtons">
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="rankingButton"
          >
            VER RANKING
          </button>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="playAgainButton"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
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
