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
});
