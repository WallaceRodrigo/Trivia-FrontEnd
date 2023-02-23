/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosSettings } from 'react-icons/io';
import { saveInfos } from '../redux/actions';
import './styles/Login.css';
import triviaLogo from '../content/triviaLogo.png';

class Login extends Component {
  state = {
    loginInput: '',
    nameInput: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  };

  saveLocalStorage = (data) => {
    localStorage.setItem('token', data);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const { nameInput, loginInput } = this.state;

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();

    this.saveLocalStorage(data.token);

    dispatch(saveInfos(nameInput, loginInput));
    history.push('/game');

    return data;
  };

  render() {
    const { history } = this.props;
    const { loginInput, nameInput } = this.state;
    const buttonValidation = loginInput.length > 1 && nameInput.length > 1;

    return (
      <div className="loginContainer">
        <img src={ triviaLogo } alt="triviaLogo" className="triviaLogo" />
        <div className="loginDiv">
          <label htmlFor="loginInput">
            <input
              type="email"
              name="loginInput"
              id="loginInput"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              placeholder="Qual é o seu e-mail do gravatar?"
            />
          </label>
          <label htmlFor="nameInput">
            <input
              type="text"
              name="nameInput"
              id="nameInput"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              placeholder="Qual é o seu nome?"
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ !buttonValidation }
            onClick={ () => this.handleClick() }
          >
            JOGAR
          </button>
          <button
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <div style={ { position: 'relative', top: '-5px' } }>
              <IoIosSettings
                style={
                  { fontSize: '20px', position: 'relative', top: '5px', right: '5px', color: '#1D7052' }
                }

              />
              CONFIGURAÇÕES
            </div>
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Login);
