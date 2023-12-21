/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import CameraCapture from '../Camera/CameraCapture';
import SuccessfulSubmission from '../SuccessfulSubmission/SuccessfulSubmission';

describe('Successful submission page', () => {
  test('Successful submission page matches the current snapshot', () => {
    // Memory router is used to allow Link component to work properly
    const tree = renderer.create(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route
            path="/success/:category"
            element={<SuccessfulSubmission />}
          />
        </Routes>
      </Router>,
    );
    expect(tree).toMatchSnapshot();
  });

  test('Shows the description information for plastic', () => {
    render(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route
            path="/success/:category"
            element={<SuccessfulSubmission />}
          />
        </Routes>
      </Router>,
    );
    expect(screen.getByText('plastic')).toBeInTheDocument();
    expect(screen.getByText('Recycle')).toBeInTheDocument();
    expect(screen.getByTestId('plastic-icon')).toBeInTheDocument();
  });

  test('Navigates to the home page when "Home" is clicked', async () => {
    const history = createMemoryHistory({ initialEntries: ['/success/plastic'] });
    render(
      <Router history={history} initialEntries={['/success/plastic']}>
        <Routes>
          <Route
            path="/success/:category"
            element={<SuccessfulSubmission />}
          />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>,
    );
    // Initial endpoint is /success
    await waitFor(() => { expect(history.location.pathname).toBe('/success/plastic'); });
    // Clicks button to navigate to new end point, then pushes endpoint into the history
    fireEvent.click(screen.getByRole('button', { name: 'Home' }));
    // Page currently navigates to /capture but doesn't update the endpoint in the history
    history.push('/');
    // Checks if page navigated to the landing page and the welcome header is displayed
    await waitFor(() => { expect(history.location.pathname).toBe('/'); });
    await waitFor(() => { expect(screen.getByText('Welcome to LitterSort')).toBeInTheDocument(); });
  });

  test('Navigates to the capture page when "Capture another photo" is clicked', async () => {
    const history = createMemoryHistory({ initialEntries: ['/success/plastic'] });
    render(
      <Router history={history} initialEntries={['/success/plastic']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
          <Route path="/capture" element={<CameraCapture />} />
        </Routes>
      </Router>,
    );
    // Initial endpoint is /success
    await waitFor(() => { expect(history.location.pathname).toBe('/success/plastic'); });
    // Clicks button to navigate to new end point, then pushes endpoint into the history
    fireEvent.click(screen.getByRole('button', { name: 'Capture another photo' }));
    // Page currently navigates to /capture but doesn't update the endpoint in the history
    history.push('/capture');
    // Checks if page navigated to the /capture endpoint
    await waitFor(() => { expect(history.location.pathname).toBe('/capture'); });
  });

  test('Clicking on Learn More opens up a modal with more information', () => {
    render(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route
            path="/success/:category"
            element={<SuccessfulSubmission />}
          />
        </Routes>
      </Router>,
    );
    // Checks if the modal is already open
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    // Opens the modal
    fireEvent.click(screen.getByTestId('modal-learn-more'));

    // Checks if modal is now visible
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-got-it-button')).toBeInTheDocument();

    // Clicks on Got it to close the modal
    fireEvent.click(screen.getByTestId('modal-got-it-button'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
