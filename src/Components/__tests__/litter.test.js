import React from 'react';
import LandingPage from '../LandingPage';
import Leaderboard from '../Leaderboard/Leaderboard.js'
import { mockTotalUploads, mockPlasticUploads, mockMetalUploads } from '../../MockData/mockLeaderboardData.js'
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

describe('Home page', () => {
    test('Landing page matches the current snapshot', () => {
        const tree = renderer.create(<LandingPage />).JSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('Leaderboard component', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockTotalUploads)
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    })
    // Creates a snapshot
    test('Leaderboard matches the current snapshot', () => {
        const tree = renderer.create(<Leaderboard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Changes category from total to compost when clicking on the dropdown', () => {
        render(<Leaderboard />);
        // Clicks on dropdown
        fireEvent.mouseDown(screen.getByText('Total'));
        // Changes dropdown to 'Compost'
        fireEvent.click(screen.getByText('Compost'));
        // Checking if 'Compost' is now the header on the dropdown
        expect(screen.getByText('Compost')).toBeInTheDocument();
    });
    test('Dropdown option text and background changes color when hovered', () => {
        render(<Leaderboard />);
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
        fetchMock.mockResponseOnce((mockTotalUploads), { url: 'http://localhost:3001/leaderboard', method: 'GET' });
        render(<Leaderboard />);

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockMetalUploads)
        });
        fireEvent.mouseDown(screen.getByText('Total'));
        fireEvent.click(screen.getByText('Metal'));
        await waitFor(() => {
            expect(screen.getByText('lucious_senger10')).toBeInTheDocument();
        });
        // fetchMock.mockResponseOnce(JSON.stringify(mockPlasticUploads), { url: 'http://localhost:3001/leaderboard/plastic', method: 'GET' });
        // fireEvent.mouseDown(screen.getByText('Metal'));
        // fireEvent.click(screen.getByText('Plastic'));

        // await waitFor(() => {
        //     expect(screen.getByText('lucious_senger10')).toNotBeInTheDocument();
        // });
    });
});