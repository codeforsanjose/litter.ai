import React from 'react';
import LandingPage from '../LandingPage';
import Leaderboard from '../Leaderboard/Leaderboard.js'
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'

describe('Home page', () => {
    test('Landing page matches the current snapshot', () => {
        const tree = renderer.create(<LandingPage />).JSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('Leaderboard component', () => {
    test('Leaderboard matches the current snapshot', () => {
        const tree = renderer.create(<Leaderboard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Changes category from total to compost when clicking on the dropdown', () => {
        render(<Leaderboard />);
        const clickDropdown = screen.getByText('Total');
        fireEvent.mouseDown(clickDropdown);

        const selectCompost = screen.getByText('Compost');
        fireEvent.click(selectCompost);

        const compostHeader = screen.getByText('Compost');
        expect(compostHeader).toBeInTheDocument();
    });
    test('Dropdown option text and background changes color when hovered', () => {
        render(<Leaderboard />);
        const clickDropdown = screen.getByText('Total');
        fireEvent.mouseDown(clickDropdown);

        const hoverCardboard = screen.getByText('Cardboard');
        fireEvent.mouseEnter(hoverCardboard);

        const mouseOverCardboard = getComputedStyle(hoverCardboard);
        expect(mouseOverCardboard.color).toBe('rgb(0, 0, 0)');
        expect(mouseOverCardboard.backgroundColor).toBe('rgb(116, 204, 103)');
    });
});