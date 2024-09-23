// pages/secondary.js
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListSecond } from '../lib/datalist';
import Secondary from '../pages/secondary';
import { useRouter } from 'next/router';


jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
      pathname: '/',
    }),
  }));


 
it('should have Shōgun text', () => {

    render(<Secondary />)

    const test2 =  screen.getByText('Shōgun')

    expect(test2).toBeInTheDocument()
})