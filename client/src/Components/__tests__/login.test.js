/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import Login from '../Login';
import * as fetchUserData from '../../utils/fetchUserData';
// import {
//   mockTotalUploads,
//   mockPlasticUploads,
//   mockMetalUploads,
// } from '../../MockData/mockLeaderboardData';

const mockSetState = jest.fn();

describe('Login component', () => {
  const user = 'Briana30';
  const login = (
    <Router>
      <Login setUser={mockSetState} />
    </Router>
  );

  test('Login page matches the current snapshot', () => {
    const tree = renderer.create(login);
    expect(tree).toMatchSnapshot();
  });

  test('Back button, input fields, login button, and sign up link render to the page', async () => {
    await render(login);
    // TODO: use getByRole and getByTestId for hierarchy
    expect(screen.getByLabelText('Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign Up')).toBeInTheDocument();
  });

  // Test invalid login
  test('Invalid login renders an message for the user', () => {
    // expect(screen.getByText('Incorrect username and/or password')).toBeInTheDocument();

    // TODO: Do stuff
    // Displays error in console
  });

  // Test valid login
  test('Valid login sets auth token cookie', () => {
    // TODO: Do stuff
    // Navigates to home page
  });

  // Test back button
  /*
  test('Back button navigates to previous page', () => {
    render(
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={mockSetState} />} />
          <Route path="/" element={<LandingPage user={user} />} />
        </Routes>
      </Router>,
    );
    const backBtn = screen.getByTestId('backBtn');
    expect(backBtn).toBeInTheDocument();
  });
    // TODO: Do stuff
  });
  */

  // Test Sign Up button
  test('Sign Up button takes user to registration page', () => {
    // TODO: Do stuff
  });
});
