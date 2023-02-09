import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Login extends Component {
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
    const { history } = this.props;

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();

    this.saveLocalStorage(data.token);

    history.push('/game');

    return data;
  };

  render() {
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Login);
