/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToCart from '../components/product_detail/AddToCart.jsx';

describe('Should have "SELECT SIZE" inside AddToCart component', () => {
  it('renders the component with the correct text', async () => {
    const skus = [
      { id: '1394805', quantity: 8, size: 'XS' },
      { id: '1394806', quantity: 16, size: 'S' },
      { id: '1394807', quantity: 17, size: 'M' },
      { id: '1394808', quantity: 10, size: 'L' },
      { id: '1394809', quantity: 15, size: 'XL' },
      { id: '1394810', quantity: 6, size: 'XXL' }];
    const { getByText } = render(<AddToCart skus={skus} />);
    const textElement = getByText('SELECT SIZE');
    expect(textElement).toBeInTheDocument();
  });
});
