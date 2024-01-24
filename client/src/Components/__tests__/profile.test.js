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
import { MemoryRouter as Router } from 'react-router-dom';
import Profile from '../Profile/Profile';
import ProfileStatistics from '../Profile/ProfileStatistics';
import * as fetchUserData from '../../utils/fetchUserData';
import { userPictureData } from '../../MockData/mockUserData';

describe('Profile component with user logged in', () => {
  const mockSetState = jest.fn();
  const profile = (
    <Router>
      <Profile user="Briana30" setUser={mockSetState} />
    </Router>
  );
  const statistics = (
    <Router>
      <ProfileStatistics user={userPictureData[0].pictureData} />
    </Router>
  );
  // Function to simulate an API call
  const mockCall = async (data) => {
    jest.spyOn(fetchUserData, 'fetchProfileData').mockResolvedValue(data);
  };

  beforeEach(async () => { await act(() => { mockCall(userPictureData); }); });
  afterEach(() => { jest.restoreAllMocks(); });

  test('Profile matches the current snapshot', async () => {
    // Snapshot currently doesn't wait for child component to render
    const tree = await act(async () => renderer.create(profile));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('Username should appear at the top of the screen', async () => {
    await act(() => render(profile));
    expect(screen.getByText('Briana30')).toBeInTheDocument();
  });

  test('Clicking on "Log out" button should remove the user\'s data', async () => {
    jest.spyOn(fetchUserData, 'fetchLogOut');
    await act(() => render(profile));
    await act(() => fireEvent.click(screen.getByRole('button', { name: /Log out/i })));
    await waitFor(() => { expect(mockSetState).toHaveBeenCalled(); });
  });

  test('Statistics should reflect the user\'s data', async () => {
    await act(() => render(statistics));
    expect(screen.getByTestId(/paper-icon/i)).toBeInTheDocument();
  });
});
