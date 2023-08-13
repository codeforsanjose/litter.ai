import LandingPage from '../LandingPage';
import renderer from 'react-test-renderer';

test('First snapshot test', () => {
    const component=renderer.create(
        <LandingPage />
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
})