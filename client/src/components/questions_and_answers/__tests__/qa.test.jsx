/* eslint-disable no-undef */
import React, { useState as useStateMock } from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor, cleanup,
} from '@testing-library/react'
import QA, {collapsed} from '../Q&A.jsx';
import '@testing-library/jest-dom'
import mockData from './mockData/mockData.js'
import renderer from 'react-test-renderer';
import jest from 'jest'

const mockData2 =
  {
    product_id: 123,
    results: [
      {
        question_id: 100,
        question_body: 'Does this test work?',
        question_date: '2023-03-24T00:00:00.000Z',
        asker_name: 'Jest',
        question_helpfulness: 25,
        reported: false,
        answers: {
          110: {
            id: 110,
            body: 'test',
            date: '2023-03-29T00:00:00.000Z',
            answerer_name: 'test',
            helpfulness: 10,
            photos: [],
          },
          111: {
            id: 111,
            body: 'this fit true to size',
            date: '2023-05-13T00:00:00.000Z',
            answerer_name: 'Scooby Doo',
            helpfulness: 1,
            photos: [],
          },
        },
      },
    ],
  }


jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));

const setState = jest.fn()

describe('Q&A render', () => {

  afterEach(() => {
    cleanup();
  });


  it('Should expand Q&A component while questions exist', async () => {
    useStateMock.mockImplementationOnce(() => [false, setState])
    render(<QA productID={mockData2}/>);
    const qaElement = screen.getByTestId('qa-1');
    expect(qaElement).toBeInTheDocument();
    expect(qaElement).toHaveTextContent('Questions and answers');
    expect().toEqual(false);
  });

  it('Should have "Questions and Answers" in the header', async () => {
    const { getByText } = render(<QA productID={mockData.product_id} />);
    const textElement = getByText('Questions and Answers');
    expect(textElement).toBeInTheDocument();
  });

  it('Should be able to click Add to cart button, when size is not selected, select menu pop up', async () => {
    const { getByText } = render(<QA productID={mockData.product_id} />);
    const button = screen.getByText('Submit a Question').closest('button');
    fireEvent.click(button);
    const reply = getByText('reply');
    expect(reply).toBeInTheDocument();
  });
});
