/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import fetchMock from 'jest-fetch-mock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddToCart from '../AddToCart.jsx';
import ImageGallery from '../ImageGallery.jsx';
import MainImage from '../MainImage.jsx';
import ProductDetail from '../Product_detail_main.jsx';
import Style from '../Style.jsx';
import App from '../../App.jsx';

let originalConsoleLog;
beforeAll(() => {
  originalConsoleLog = console.log;
  console.log = jest.fn();
});
afterAll(() => {
  console.log = originalConsoleLog;
});

describe('App', () => {
  it('displays loading message', async () => {
    jest.mock('../../App.jsx', () => ({
      fetchDataById: jest.fn(() => Promise.resolve()),
    }));
    render(<App />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('displays loading message', () => {
    render(<App />);
    const loadingMessage = screen.getByText('loading...');
    expect(loadingMessage).toBeInTheDocument();
  });
});

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

describe('Passing not null data in <ProductDetail />', () => {
  const product = {
    id: 40344,
    campus: 'hr-rfp',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
  };
  const styles = {
    product_id: '40344',
    results: [
      {
        style_id: 240500,
        name: 'Forest Green & Black',
        original_price: '140.00',
        sale_price: null,
        'default?': true,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          }],
        skus: {
          1394769: {
            quantity: 8,
            size: 'XS',
          },
          1394770: {
            quantity: 16,
            size: 'S',
          },
        },
      },
      {
        style_id: 240501,
        name: 'Desert Brown & Tan',
        original_price: '140.00',
        sale_price: null,
        'default?': false,
        photos: [
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          },
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          },
          {
            thumbnail_url: 'https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
          },
        ],
        skus: {
          1394775: {
            quantity: 8,
            size: 'XS',
          },
          1394776: {
            quantity: 16,
            size: 'S',
          },
          1394777: {
            quantity: 17,
            size: 'M',
          },
          1394778: {
            quantity: 10,
            size: 'L',
          },
        },
      }],
  };

  it('Should have "Read all reviews" inside ProductDetail component', async () => {
    // scrollIntoView is not implemented in jsdom
    Element.prototype.scrollIntoView = jest.fn();
    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const textElement = getByText('Read all reviews');
    expect(textElement).toBeInTheDocument();
    expect(getByText('Camo Onesie')).toBeInTheDocument();
  });

  it('Should be able to click Add to cart button, when size is not selected, select menu pop up', async () => {
    // scrollIntoView is not implemented in jsdom
    Element.prototype.scrollIntoView = jest.fn();
    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const button = screen.getByText('ADD TO BAG').closest('button');
    fireEvent.click(button);
    const menu = getByText('XS');
    expect(menu).toBeTruthy();
  });
});

describe('When photos url and skus are null', () => {
  it('When the stock is not available, should show out of stock and add to cart button is disabled', async () => {
    const product = {
      id: 40344,
      campus: 'hr-rfp',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
    };
    const styles = {
      product_id: '40345',
      results: [
        {
          style_id: 240506,
          name: 'Black Lenses & Black Frame',
          original_price: '69.00',
          sale_price: null,
          'default?': false,
          photos: [{ thumbnail_url: null, url: null }],
          skus: { null: { quantity: null, size: null } },
        }],
    };
    // scrollIntoView is not implemented in jsdom
    Element.prototype.scrollIntoView = jest.fn();
    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const button = screen.getByText('ADD TO BAG').closest('button');
    expect(button).toBeDisabled();
    const element = getByText('OUT OF STOCK');
    expect(element).toBeTruthy();
  });
});
