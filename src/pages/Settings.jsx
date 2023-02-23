import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles/Settings.css';
import triviaLogo from '../content/triviaLogo.png';

class Settings extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="settingsContainer">
        <div className="settingsDiv">
          <img src={ triviaLogo } alt="triviaLogo" className="settingsTriviaLogo" />
          <h1 data-testid="settings-title">Configurações</h1>
          <h2>Infelizmente a aplicação ainda não possui opções de configuração</h2>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="playAgainButton"
          >
            JOGAR
          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Settings;
