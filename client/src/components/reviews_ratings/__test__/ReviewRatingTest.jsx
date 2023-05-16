/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewRating from '../components/ReviewRating.jsx';

// const request = require('supertest');


describe('ReviewRating component testing', () => {
  it('should return keys of ratingFilter', async () => {
    const product ="40344"
    const productName = 'Camo Onesie'

    const { getByText } = render(<ReviewRating product={product} productName={productName}/>);

    const textElement = getByText('Ratings & Reviews');
    expect(textElement).toBeInTheDocument();
  });
});

