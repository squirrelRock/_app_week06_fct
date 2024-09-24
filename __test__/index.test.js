import React from 'react'; 
import '@testing-library/jest-dom';

// i'm going to check if getStaticProps is defined
import { getStaticProps } from '../pages/index'; 

describe('Home page', () => {
  it('contains a getStaticProps function', () => {
    expect(getStaticProps).toBeDefined(); 
  });
});