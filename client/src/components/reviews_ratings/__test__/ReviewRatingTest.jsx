/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from '../../App.jsx';

import ReviewRating from '../components/ReviewRating.jsx';

jest.mock('axios');

const reviewMockData = {
  review_id: 1279725,
  rating: 1,
  summary: "avg prodTESTuct for avg ppl",
  recommend: true,
  response: null,
  body: "overall an TESTavg product",
  date: "2023-05-05T00:00:00.000Z",
  reviewer_name: "bobTEST",
  helpfulness: 5,
  photos: []
}
//mock module
// jest.mock('')

// describe('ReviewRating component testing', () => {
//   it('should return keys of ratingFilter', async () => {
//     const product ="40344"
//     const productName = 'Camo Onesie'

//     const { getByText } = render(<ReviewRating product={product} productName={productName}/>);

//     const textElement = getByText('Ratings & Reviews');
//     expect(textElement).toBeInTheDocument();
//   });
// });

