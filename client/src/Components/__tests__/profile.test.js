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
import Cookies from 'js-cookie';
import Profile from '../Profile/Profile';
import * as fetchUserData from '../../utils/fetchUserData';
import { userPictureData } from '../../MockData/mockUserData';

// describe('Profile component with user logged in', () => {
//   jest.mock('js-cookie');
//   jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn(),
//   }));
//   jest.mock('../../utils/fetchUserData', () => ({
//     ...jest.requireActual('../../utils/fetchUserData'),
//     fetchProfileData: jest.fn(),
//   }));

//   const mockSetState = jest.fn();

//   test('Profile matches the current snapshot', () => {
//     const tree = renderer.create(
//       <Router>
//         <Profile user="Briana30" setUser={mockSetState} />
//       </Router>,
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
//   });

//   test('Username should appear at the top of the screen', async () => {
//     render(
//       <Router>
//         <Profile user="Briana30" setUser={mockSetState} />
//       </Router>,
//     );
//     expect(screen.getByText('Briana30')).toBeInTheDocument();
//   });

//   test('Statistics should reflect the user\'s data', async () => {
//     fetchUserData.fetchProfileData.mockResolvedValue(userPictureData[0]);
//     React.useState.mockReturnValue(['Briana30', mockSetState]);
//     render(
//       <Router>
//         <Profile user="Briana30" setUser={mockSetState} />
//       </Router>,
//     );
//     expect(screen.getByText('Briana30')).toBeInTheDocument();
//   });
// });
