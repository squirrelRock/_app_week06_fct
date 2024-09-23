import React from 'react'; 
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: '/',
  }),
}));

 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', {  name: /Main Characters/i, })
 
    expect(heading).toBeInTheDocument()
  })
})

