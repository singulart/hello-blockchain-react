import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Joystream from './Joystream';

describe('<Joystream />', () => {
  test('it should mount', () => {
    render(<Joystream />);
    
    const joystream = screen.getByTestId('Joystream');

    expect(joystream).toBeInTheDocument();
  });
});