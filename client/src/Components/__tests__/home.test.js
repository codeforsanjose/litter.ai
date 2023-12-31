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
});
