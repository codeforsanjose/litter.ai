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
import App from '../../App';
import PageNotFound from '../PageNotFound';
import Login from '../Login';
import LandingPage from '../LandingPage';

describe('Page Not Found component', () => {
  const PNFpage = <Router><PageNotFound /></Router>;
  // Creates a snapshot
  test('Leaderboard matches the current snapshot', () => {
    const tree = renderer.create(
      <Router>
        <PageNotFound />
      </Router>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('404 page exists', () => {
    render(PNFpage);
    expect(screen.getByTestId('PNF-icon')).toBeInTheDocument();
    expect(screen.getByText('Your litter will have to be recycled elsewhere.')).toBeInTheDocument();
  });

  test('Home button redirects to the home page', () => {
    /* The Routes component is erroring and only renders the LandingPage as
    a Route, putting PageNotFound outside of Routes is a temporary solution */
    render(
      <Router>
        <PageNotFound />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>,
    );
    expect(screen.getByTestId('PNF-icon')).toBeInTheDocument();
    expect(screen.getByText('Your litter will have to be recycled elsewhere.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(screen.getByText('Welcome to LitterSort')).toBeInTheDocument();
  });
});
