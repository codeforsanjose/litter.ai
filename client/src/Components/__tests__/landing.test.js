/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import CameraCapture from '../Camera/CameraCapture';
import Register from '../Register';
import Login from '../Login';

describe('Home component', () => {
  const landingPage = <Router><LandingPage /></Router>;
  const user = 'Briana30';

  test('Landing page matches the current snapshot', () => {
    const tree = renderer.create(landingPage);
    expect(tree).toMatchSnapshot();
  });

  test('Logo and introduction text loads on the screen', () => {
    render(landingPage);
    expect(screen.getByTestId('litterai-logo')).toBeInTheDocument();
    expect(screen.getByText('Welcome to LitterSort')).toBeInTheDocument();
    expect(screen.getByText('With just a photo, sort your garbage and save the world.')).toBeInTheDocument();
  });

  test("Clicking on 'Capture Picture' navigates to capture page", async () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/capture" element={<CameraCapture />} />
        </Routes>
      </Router>,
    );

    expect(screen.getByTestId('litterai-logo')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Capture Picture' }));
    expect(screen.getByText('Take a photo of the item')).toBeInTheDocument();
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

    expect(screen.getByTestId('litterai-logo')).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
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
