import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveInfos } from '../redux/actions';

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
      <div>
        <label htmlFor="loginInput">
          <p>Email</p>
          <input
            type="email"
            name="loginInput"
            id="loginInput"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="nameInput">
          <p>Nome</p>
          <input
            type="text"
            name="nameInput"
            id="nameInput"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ !buttonValidation }
          onClick={ () => this.handleClick() }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
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
