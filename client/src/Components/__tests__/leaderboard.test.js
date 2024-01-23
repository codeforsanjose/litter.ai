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
import Leaderboard from '../Leaderboard';
import * as fetchUserData from '../../utils/fetchUserData';
import {
  mockTotalUploads,
  mockPlasticUploads,
  mockMetalUploads,
} from '../../MockData/mockLeaderboardData';

describe('Leaderboard component', () => {
  const leaderboard = <Router><Leaderboard /></Router>;
  // Function to simulate an API call
  const mockCall = async (data) => {
    jest.spyOn(fetchUserData, 'fetchLeaderboardData').mockResolvedValue(data);
  };

  // Start each test with total top 10 API call; reset mock after each test
  beforeEach(() => { mockCall(mockTotalUploads); });
  afterEach(() => { jest.restoreAllMocks(); });

  // Creates a snapshot
  test('Leaderboard matches the current snapshot', async () => {
    const tree = await act(async () => renderer.create(leaderboard));
    // Update tree because it renders nulls on initial load
    await act(() => tree.update(leaderboard));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('Changes category from total to compost when clicking on the dropdown', async () => {
    await act(() => render(leaderboard));
    // Clicks on dropdown
    fireEvent.mouseDown(screen.getByText('Total'));
    // Changes dropdown to 'Compost'
    await act(() => fireEvent.click(screen.getByText('Compost')));
    // Checking if 'Compost' is now the header on the dropdown
    expect(screen.getByText('Compost')).toBeInTheDocument();
  });

  test('Dropdown option text and background changes color when hovered', async () => {
    await act(() => render(leaderboard));
    // Clicks on dropdown
    fireEvent.mouseDown(screen.getByText('Total'));
    // Hover over new category
    fireEvent.mouseEnter(screen.getByText('Cardboard'));
    // Checking if 'Cardboard' has the hovered color and background color
    const mouseOverCardboard = getComputedStyle(screen.getByText('Cardboard'));
    expect(mouseOverCardboard.color).toBe('rgb(0, 0, 0)');
    expect(mouseOverCardboard.backgroundColor).toBe('rgb(116, 204, 103)');
  });

  test('New data is rendered when a dropdown category is changed', async () => {
    await act(() => render(leaderboard));
    // Change category and data to metal
    await act(() => { mockCall(mockMetalUploads); });

    fireEvent.mouseDown(screen.getByText('Total'));
    act(() => fireEvent.click(screen.getByText('Metal')));
    await waitFor(() => { expect(screen.getByText(/No Photos/i)).toBeInTheDocument(); });
    // Checks if a specific user is in the document
    await waitFor(() => { expect(screen.getByText('lucious_senger10')).toBeInTheDocument(); });
    // Change category and data to plastic
    fireEvent.mouseDown(screen.getByText('Metal'));
    act(() => { mockCall(mockPlasticUploads); });
    act(() => fireEvent.click(screen.getByText('Plastic')));
    // Checks if top metal user is no longer there and if a top plastic user is now visible
    await waitFor(() => { expect(screen.queryByText('lucious_senger10')).not.toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText('alejandra31')).toBeInTheDocument(); });
  });
});
