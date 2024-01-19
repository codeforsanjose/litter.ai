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
import { createMemoryHistory } from 'history';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import CameraCapture from '../Camera/CameraCapture';
import Leaderboard from '../Leaderboard';
import Register from '../Register';
import Login from '../Login';

describe('Home component', () => {
  const landingPage = <Router><LandingPage /></Router>;

  test('Landing page matches the current snapshot', () => {
    const tree = renderer.create(landingPage);
    expect(tree).toMatchSnapshot();
  });

  test('Logo and introduction text loads on the screen', () => {
    render(landingPage);
    expect(screen.getByTestId('home-logo')).toBeInTheDocument();
    expect(screen.getByText('Welcome to LitterSort')).toBeInTheDocument();
    expect(screen.getByText('With just a photo, sort your garbage and save the world.')).toBeInTheDocument();
  });

  test("Clicking on 'Capture Picture' navigates to capture page", async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/capture" element={<CameraCapture />} />
        </Routes>
      </Router>,
    );

    expect(screen.getByTestId('home-logo')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Capture Picture' }));
    expect(screen.getByText('Take a photo of the item')).toBeInTheDocument();
  });

  test('Clicking on Leaderboard button navigates to the leaderboard page', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>,
    );

    expect(screen.getByTestId('home-logo')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Leaderboard' }));
    expect(screen.queryByText('Welcome to LitterSort')).not.toBeInTheDocument();
  });

  test('Clicking on Sign Up button navigates to the registration page', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>,
    );

    expect(screen.getByTestId('home-logo')).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByText('Registration page')).toBeInTheDocument();
  });

  test('Clicking on Log in button navigates to the Login page', async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>,
    );

    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Log in' }));
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
});
