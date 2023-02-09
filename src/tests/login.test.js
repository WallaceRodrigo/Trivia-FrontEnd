import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

const mockApi = {
  "response_code": 0,
  "response_message": "Token Generated Successfully!",
  "token": "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

describe('Testa a pagina Login', () => {
  it('teste 1', async () => {

    const { history } = renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    expect(playButton).toBeDisabled();

    userEvent.type(nameInput, 'Roberto');
    userEvent.type(emailInput, 'Roberto@gmail.com');
    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    });
  })

  it('teste 2', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const settingsButton = screen.getByTestId('btn-settings');

    userEvent.click(settingsButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');
  })

  it('teste 3', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockReturnValueOnce(mockApi)
    });

    const { history } = renderWithRouterAndRedux(<Login />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const buttonPlay = screen.getByTestId('btn-play')

    userEvent.type(name, 'Bia')
    userEvent.type(email, 'test@test.com')
    userEvent.click(buttonPlay)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    })
  })
})