import React, { Component } from 'react';

export class Login extends Component {
  state = {
    loginInput: '',
    nameInput: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
