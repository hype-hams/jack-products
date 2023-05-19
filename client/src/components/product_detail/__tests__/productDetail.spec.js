/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import fetchMock from 'jest-fetch-mock';
import {
  render, screen, fireEvent, waitFor, cleanup, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AddToCart from '../AddToCart.jsx';
import ImageGallery from '../ImageGallery.jsx';
import ProductDetail from '../Product_detail_main.jsx';
import App from '../../App.jsx';

// scrollIntoView is not implemented in jsdom
Element.prototype.scrollIntoView = jest.fn();

let originalConsoleLog;
beforeAll(() => {
  originalConsoleLog = console.log;
  console.log = jest.fn();
});
afterAll(() => {
  console.log = originalConsoleLog;
});
afterEach(() => {
  cleanup();
});

jest.mock('axios');

axios.get.mockImplementation((url) => {
  if (url === '/api/reviews/meta?product_id=40344') {
    return Promise.resolve({
      data: {
        product_id: '40351',
        ratings: {
          1: '16', 2: '9', 3: '34', 4: '12', 5: '75',
        },
      },
    });
  }
  return Promise.reject(new Error('Mock axios error'));
});

describe('Testing in <App />', () => {
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

describe('Testing not null data in <ProductDetail />', () => {
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
          1394769: { quantity: 8, size: 'XS' },
          1394770: { uantity: 16, size: 'S' },
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
          1394775: { quantity: 8, size: 'XS' },
          1394776: { quantity: 16, size: 'S' },
          1394777: { quantity: 17, size: 'M' },
          1394778: { quantity: 10, size: 'L' },
        },
      }],
  };

  it('Should have "Read all reviews" on the page, click on it will invoke scrollIntoView', async () => {
    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const element = getByText('Read all reviews');
    expect(element).toBeInTheDocument();
    expect(getByText('Camo Onesie')).toBeInTheDocument();
    fireEvent.click(element);
    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('Should be able to click Add to cart button, when size is not selected, select menu pop up', async () => {
    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const button = screen.getByText('ADD TO BAG').closest('button');
    fireEvent.click(button);
    const menu = getByText('XS');
    expect(menu).toBeTruthy();
  });

  it('The page shows the first style as the default, and the title of the second style only appears after clicking on it', async () => {
    render(<ProductDetail product={product} styles={styles} />);
    const secondStyleTitle = screen.queryByText('Desert Brown & Tan');
    expect(secondStyleTitle).not.toBeInTheDocument();
    const thumbnails = screen.getAllByTestId('style-thumbnail');
    fireEvent.click(thumbnails[1]);
    await waitFor(() => {
      const secondStyle = screen.getByText('Desert Brown & Tan');
      expect(secondStyle).toBeInTheDocument();
    });
  });
});

describe('Testing null data in <ProductDetail />', () => {
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

    const { getByText } = render(<ProductDetail product={product} styles={styles} />);
    const button = screen.getByText('ADD TO BAG').closest('button');
    expect(button).toBeDisabled();
    const element = getByText('OUT OF STOCK');
    expect(element).toBeTruthy();
  });
});

describe('Tesing in <AddToCart />', () => {
  const skusArr = [
    { sku_id: '1394805', quantity: 8, size: 'XS' }];
  beforeAll(() => {
    document.body.addEventListener = jest.fn();
    document.body.removeEventListener = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should be able to select size and quantity', async () => {
    render(<AddToCart skus={skusArr} />);
    const sizeSelector = screen.getByText('SELECT SIZE');
    fireEvent.click(sizeSelector);
    const xs = screen.getByText('XS');
    act(() => {
      xs.click();
    });
  });
});

const photos = [
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80',
  },
];

describe('Tesing in <ImageGallery />', () => {
  it('Should render main images', async () => {
    render(<ImageGallery photos={photos} />);
    const img = screen.getByAltText('main');
    expect(img).toBeInTheDocument();
  });

  it('Should have left arrow but display is none', async () => {
    render(<ImageGallery photos={photos} />);
    const left = screen.getByTestId('left-arrow');
    expect(left).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(left);
    expect(computedStyle.display).toBe('none');
  });

  it('After click on right arrow, left arrow display should be block, click on right arrow again, left arrow should be none', async () => {
    render(<ImageGallery photos={photos} />);
    const right = screen.getByTestId('right-arrow');
    expect(right).toBeInTheDocument();
    fireEvent.click(right);
    const left = screen.getByTestId('left-arrow');
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(left);
      expect(computedStyle.display).toBe('block');
    });
    fireEvent.click(left);
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(left);
      expect(computedStyle.display).toBe('none');
    });
  });

  it('Click on down arrow first will invoke scrollIntoView, and then click on up arrow will invoke scrollIntoView again', async () => {
    render(<ImageGallery photos={photos} />);
    const down = screen.getByTestId('down-arrow');
    expect(down).toBeInTheDocument();
    fireEvent.click(down);
    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
    const up = screen.getByTestId('up-arrow');
    fireEvent.click(up);
    await waitFor(() => {
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('Should be able to click on the second thumbnail, and left arrow will appear', async () => {
    const onePhoto = [
      {
        thumbnail_url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      }, {
        thumbnail_url: 'https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80',
      }];
    render(<ImageGallery photos={onePhoto} />);
    const img = screen.getAllByAltText('thumbnail');
    expect(img[1]).toBeInTheDocument();
    fireEvent.click(img[1]);
    const left = screen.getByTestId('left-arrow');
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(left);
      expect(computedStyle.display).toBe('block');
    });
  });
});

describe('Tesing in <MainImage />', () => {
  it('Click on main image should change to expanded view, click again will change to zoomed view', async () => {
    render(<ImageGallery photos={photos} />);
    const img = screen.getByAltText('main');
    fireEvent.click(img);
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(img);
      expect(computedStyle.cursor).toBe('zoom-in');
    });
    fireEvent.click(img);
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(img);
      expect(computedStyle.cursor).toBe('zoom-out');
    });
  });

  it('Click on expanded view icon should toggle as required', async () => {
    render(<ImageGallery photos={photos} />);
    const icon = screen.getByTestId('icon');
    const img = screen.getByAltText('main');
    expect(icon).toBeInTheDocument();
    fireEvent.click(icon);
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(img);
      expect(computedStyle['object-fit']).toBe('contain');
    });
    fireEvent.click(img);
    fireEvent.click(icon);
    await waitFor(() => {
      const computedStyle = window.getComputedStyle(img);
      expect(computedStyle['object-fit']).toBe('cover');
    });
  });
});
