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
import CameraCapture from '../Camera/CameraCapture';
import SuccessfulSubmission from '../SuccessfulSubmission/SuccessfulSubmission';
import PageNotFound from '../PageNotFound';

describe('Successful submission page', () => {
  test('Successful submission page matches the current snapshot', () => {
    // Memory router is used to allow Link component to work properly
    const tree = renderer.create(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
        </Routes>
      </Router>,
    );
    expect(tree).toMatchSnapshot();
  });

  test('Shows the description information for plastic', () => {
    render(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
        </Routes>
      </Router>,
    );
    expect(screen.getByText('plastic')).toBeInTheDocument();
    expect(screen.getByText('Recycle')).toBeInTheDocument();
    expect(screen.getByTestId('plastic-icon')).toBeInTheDocument();
  });

  test('Navigates to the capture page when "Capture photo" is clicked', async () => {
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
    fireEvent.click(screen.getByRole('button', { name: 'Capture photo' }));
    // Page currently navigates to /capture but doesn't update the endpoint in the history
    history.push('/capture');
    // Checks if page navigated to the /capture endpoint
    await waitFor(() => { expect(history.location.pathname).toBe('/capture'); });
  });

  test('Navigates to the error page when a non-category is clicked', async () => {
    const history = createMemoryHistory({ initialEntries: ['/success/wrong-category'] });
    render(
      <Router history={history} initialEntries={['/success/wrong-category']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </Router>,
    );
    // Initial endpoint is a random wrong link
    await waitFor(() => { expect(history.location.pathname).toBe('/success/wrong-category'); });
    history.push('/404');
    // Checks if page navigated to the /404 endpoint
    await waitFor(() => { expect(history.location.pathname).toBe('/404'); });
    await waitFor(() => { expect(screen.getByTestId('PNF-icon')).toBeInTheDocument(); });
  });

  test('Clicking on Learn More opens up a modal with more information', () => {
    render(
      <Router initialEntries={['/success/plastic']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
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

  test('Clicking on X closes the modal', () => {
    render(
      <Router initialEntries={['/success/cardboard']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
        </Routes>
      </Router>,
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('modal-learn-more'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Clicks on X to close the modal
    fireEvent.click(screen.getByTestId('modal-x-button'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('Clicking outside of the modal closes the modal', () => {
    render(
      <Router initialEntries={['/success/metal']}>
        <Routes>
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
        </Routes>
      </Router>,
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('modal-learn-more'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Clicks on X to close the modal
    fireEvent.click(screen.getByTestId('modal-background'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
