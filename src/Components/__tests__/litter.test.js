import React from 'react';
import LandingPage from '../LandingPage';
import Leaderboard from '../Leaderboard/Leaderboard.js';
import SuccessfulSubmission from '../SuccessfulSubmission';
import { categoryData } from '../../MockData/mockCategoryData.js'
import { mockTotalUploads, mockPlasticUploads, mockMetalUploads } from '../../MockData/mockLeaderboardData.js'
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor, documentBody } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

// describe('Home page', () => {
// 	test('Landing page matches the current snapshot', () => {
// 		const tree = renderer.create(<LandingPage />).JSON();
// 		expect(tree).toMatchSnapshot();
// 	})
// });

describe('Leaderboard component', () => {
	// Function to simulate an API call
	const mockCall = (data) => {
		jest.spyOn(global, 'fetch').mockResolvedValue({
			json: jest.fn().mockResolvedValue(data)
		});
	}

	// Start each test with total top 10 API call; reset mock after each test
	beforeEach(() => { mockCall(mockTotalUploads) });
	afterEach(() => { jest.restoreAllMocks() })

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
		render(<Leaderboard />);
		// Change category and data to metal
		mockCall(mockMetalUploads);
		fireEvent.mouseDown(screen.getByText('Total'));
		fireEvent.click(screen.getByText('Metal'))
		await waitFor(() => {
			expect(screen.getByText('lucious_senger10')).toBeInTheDocument()
		});
		// Change category and data to plastic
		fireEvent.mouseDown(screen.getByText('Metal'));
		mockCall(mockPlasticUploads);
		fireEvent.click(screen.getByText('Plastic'));
		// Searches for previously prevent name and for a new name
		await waitFor(() => {
			expect(screen.queryByText('lucious_senger10')).not.toBeInTheDocument();
			expect(screen.getByText('alejandra31')).toBeInTheDocument();
		});
	});
});

describe('Successful submission page', () => {
	test('Successful submission page matches the current snapshot', () => {
		// Memory router is used to allow Link component to work properly
		const tree = renderer.create(
			<MemoryRouter>
				<SuccessfulSubmission type={categoryData.plastic} />
			</MemoryRouter>
		)
		expect(tree).toMatchSnapshot();
	});
	test('Shows the description information for plastic', () => {
		render(
			<MemoryRouter>
				<SuccessfulSubmission type={categoryData.plastic} />
			</MemoryRouter>);
		expect(screen.getByText('Plastic')).toBeInTheDocument();
		expect(screen.getByText('Recycle')).toBeInTheDocument();
	});
});