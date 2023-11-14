import LandingPage from '../LandingPage';
import Leaderboard from '../Leaderboard/Leaderboard.js'
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react'

// test('First snapshot test', () => {
//     const component=renderer.create(<LandingPage />);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

describe('Leaderboard component', () => {
    it('Leaderboard matches the current snapshot', () => {
        const tree = renderer.create(<Leaderboard />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});