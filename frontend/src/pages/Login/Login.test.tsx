import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import LoginView from './Login.view';
import { createBrowserHistory } from "history";
import { Router } from 'react-router';

describe("Login Screen", () => {
  const dummyEmail = 'test@test.com';
  const dummyPassword = 'password';
  let handleOnSubmit = jest.fn;

  beforeEach(() => {
    const history = createBrowserHistory();
    handleOnSubmit = jest.fn();

    render(
      <Router history={history}>
        <LoginView onSubmit={handleOnSubmit} />
      </Router>
    );
  })
  test('should submit form if valid email and password is provided', async () => {
    const emailInput = await screen.findByTestId('email');
    const passwordInput = await screen.findByTestId('password');
    const loginButton = await screen.findByTestId('login-button');

    userEvent.type(emailInput, dummyEmail);
    userEvent.type(passwordInput, dummyPassword);

    loginButton.click();

    expect(handleOnSubmit).toHaveBeenCalled();
  });

  test('should not submit form if email or password is empty', async () => {
    const emailInput = await screen.findByTestId('email');
    const passwordInput = await screen.findByTestId('password');
    const loginButton = await screen.findByTestId('login-button');

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, '');

    loginButton.click();

    expect(handleOnSubmit).not.toHaveBeenCalled();
  });
})

