/**
 * @format
 */
// Note: import explicitly to use the types shipped with jest.
import React from 'react';
import 'react-native';

import {it} from '@jest/globals';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../App';

it('renders correctly', () => {
  renderer.create(<App />);
});
