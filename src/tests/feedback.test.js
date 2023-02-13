import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';
import Feedback from '../pages/Feedback';

describe('Testa a pagina Login', () => {
  it('teste 1', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)
  })

  it('teste 2', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)

    const playAgainButton = screen.getByTestId('btn-play-again');

    userEvent.click(playAgainButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  })

  it('teste 3', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />)

    const RankingButton = screen.getByTestId('btn-ranking');

    userEvent.click(RankingButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/ranking');
  })
});
