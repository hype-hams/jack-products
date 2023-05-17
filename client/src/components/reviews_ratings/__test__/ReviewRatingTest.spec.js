/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from '../../App.jsx';
import ProductBreakdown from '../components/ProductBreakdown.jsx';
import RatingBreakdown from '../components/RatingBreakdown.jsx';
import ReviewHelpers from '../components/ReviewHelpers.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewTile from '../components/ReviewTile.jsx';
import SortBar from '../components/SortBar.jsx';
import Stars, {calcStar} from '../components/Stars.jsx';
import ReviewRating, {getReviews} from '../components/ReviewRating.jsx';
import AddCharacteristics from '../components/AddReview/AddCharacteristics.jsx';
import Modal from '../components/AddReview/Modal.jsx';
import SetStars from '../components/AddReview/SetStars.jsx';
import UploadPhotos from '../components/AddReview/UploadPhotos.jsx';


const productId = 40344;
const productName = 'Camo Onesie'
const reviewMockData = [
  {
      "review_id": 1275026,
      "rating": 4,
      "summary": "askdjfbhadhbflasjdbfnlaksdjbf",
      "recommend": true,
      "response": null,
      "body": "fljnaslkdjfbalksjdbflaskjbdflasjdbflaijsdbfliasjbdf",
      "date": "2022-06-02T00:00:00.000Z",
      "reviewer_name": "akjsdfajsdf2",
      "helpfulness": 1,
      "photos": []
  },
  {
      "review_id": 1277708,
      "rating": 4,
      "summary": "wowowowowowowo",
      "recommend": true,
      "response": null,
      "body": "wowowowowowowowowowowowowowowowowwowowowowowowowowo",
      "date": "2022-12-08T00:00:00.000Z",
      "reviewer_name": "wavyjv",
      "helpfulness": 1,
      "photos": []
  },
  {
      "review_id": 1274994,
      "rating": 3,
      "summary": "",
      "recommend": true,
      "response": null,
      "body": "Test with no CLOUD api key please WOOOOOOOOORKKKK!!!!!",
      "date": "2022-06-01T00:00:00.000Z",
      "reviewer_name": "jibbly",
      "helpfulness": 1,
      "photos": [
          {
              "id": 2455095,
              "url": "http://res.cloudinary.com/gc7654738/image/upload/v1654121791/FEC/twptejwpmz1khi07xecn.jpg"
          }
      ]
  },
  {
      "review_id": 1274992,
      "rating": 4,
      "summary": "",
      "recommend": false,
      "response": null,
      "body": "YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
      "date": "2022-06-01T00:00:00.000Z",
      "reviewer_name": "jibbly",
      "helpfulness": 1,
      "photos": [
          {
              "id": 2455092,
              "url": "http://res.cloudinary.com/gc7654738/image/upload/v1654121410/FEC/pn29n8p7buncmbaozbfk.jpg"
          },
          {
              "id": 2455093,
              "url": "http://res.cloudinary.com/gc7654738/image/upload/v1654121410/FEC/iwt7bvzavgqcrcz9lrxr.jpg"
          }
      ]
  },
  {
      "review_id": 1275148,
      "rating": 4,
      "summary": "these shoes are awesome",
      "recommend": true,
      "response": null,
      "body": "most comfortable shoes I've tried on in my life! feels like i'm walking on clouds",
      "date": "2022-06-03T00:00:00.000Z",
      "reviewer_name": "joe",
      "helpfulness": 1,
      "photos": [
          {
              "id": 2455164,
              "url": "http://res.cloudinary.com/dppbuevux/image/upload/v1654300394/rtgh43m5ddkjlly1b1no.jpg"
          }
      ]
  }
]
const metaMockData = {
  "product_id": "40344",
  "ratings": {
      "1": "145",
      "2": "204",
      "3": "321",
      "4": "311",
      "5": "694"
  },
  "recommended": {
      "false": "424",
      "true": "1251"
  },
  "characteristics": {
      "Fit": {
          "id": 135219,
          "value": "3.2741935483870968"
      },
      "Length": {
          "id": 135220,
          "value": "3.3130165289256198"
      },
      "Comfort": {
          "id": 135221,
          "value": "3.3547334058759521"
      },
      "Quality": {
          "id": 135222,
          "value": "3.3222698072805139"
      }
  }
}
const mockAvgRate = metaMockData.ratings;
const mockProductRating = Object.values(metaMockData.characteristics)
const mockRecommended = metaMockData.recommended;
const mockRating = Object.entries(metaMockData.ratings).map(entry => {
  return {
    id: Number(entry[0]), val: Number(entry[1])
  }
})
jest.mock('axios')

describe('ReviewRating axios testing' , () => {
  it('data request successful', async () => {
    axios.get.mockResolvedValue({ data: reviewMockData });
    render (
      <ReviewRating productId={productId} productName={productName}/>
    )
    const reviewData = await waitFor(() => screen.findAllByTestId('review-tile'))
    expect(reviewData).toHaveLength(5)
  });
});

describe('App validation', () => {
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

describe('ReviewRating component test', () => {
  it('render rating header', async () => {
    const {getByText} = render(<ReviewRating productId={productId} productName={productName}/>);
    expect(screen.getByText('Rating Breakdown')).toBeInTheDocument();
  });
  it('render product header', async () => {
    const {getByText} = render(<ReviewRating productId={productId} productName={productName}/>);
    expect(screen.getByText('Product Breakdown')).toBeInTheDocument();
  });
});

describe('ProductBreakdown component testing', () => {
  it('checks for render of bar on product page', async () => {
    const mockCharObj = {id: 135219, value: '3.2741935483870968'}
    await render(<ProductBreakdown charObj={mockCharObj}/>)
      const result = await screen.getByTestId('ProductBreakdownTestMeter')
      expect(result).toBeTruthy()
  });
  it('checks for render of char name on product page', async () => {
    const mockCharObj = {id: 135219, value: '3.2741935483870968'}
    await render(<ProductBreakdown charObj={mockCharObj}/>)
      const result = await screen.findByTestId('ProductBreakdownTestChar')
      expect(result).toBeTruthy()
  });
});

describe('RatingBreakdown component testing', () => {
  it('checks rating breakdown bar is rendering', async () => {
    await render(<RatingBreakdown recommended={mockRecommended}
      rating={mockRating}
      avgRate={mockAvgRate}
      productId={productId}/>)
    const result = await screen.findByTestId('RatingBreakdownBar')
    expect(result).toBeTruthy()
  });
});

describe('Stars component testing', () => {
  // it('checks Stars avg bar is rendering', async () => {
  //   await render(<Stars rating={mockRating} productId={productId} />)
  //   const result = await screen.findByTestId('StarsAvgRateBar')
  //   expect(result).toBeTruthy()
  // });
  it('checks Stars avg value is rendering', async () => {
    jest.mock("../components/Stars.jsx", () => ({
      renderStarBar: jest.fn(() => Promise.resolve())
    }));
    await render(<Stars rating={mockRating} productId={productId} />)
    const avgStar = await screen.getByTestId('★')
    expect(avgStar).toBeInTheDocument()


    // const starValue = await waitFor(() => screen.findAllByTestId('StarsAvgRateVal'))
    // expect(starValue).toHaveLength(2)
    // expect(starValue)
    // const result = await screen.findByTestId('StarsAvgRateVal')
    // expect(result).toBeTruthy()
  });
});

describe('Modal component testing', () => {
  it('checks if modal is popping up properly', async ()=>{
    await render(<Modal productRating={mockProductRating} productName={productName} productId={productId} test={true}/>)

    const modalRender= await screen.getByTestId('modalTest')
    expect(modalRender).toBeVisible()
  });

  it('checks onChange is passing correctly for strings', async () => {
    // const handleClick = jest.fn()
    await render(<Modal productRating={mockProductRating} productName={productName} productId={productId} test={true}/>)
    const summary = screen.getByLabelText('summary-input')
    fireEvent.change(summary, {target: {value: true}})

    const body = screen.getByLabelText('summary-body')
    fireEvent.change(body, {target: {value: true}})

    const username = screen.getByLabelText('username')
    fireEvent.change(username, {target: {value: true}})

    const email = screen.getByLabelText('email')
    fireEvent.change(email, {target: {value: true}})
    expect(summary.value).toBeTruthy()
    expect(body.value).toBeTruthy()
    expect(username.value).toBeTruthy()
    expect(email.value).toBeTruthy()
  });
  // it('check onClick is passing corectly', async () => {
  //   const handleClick = jest.fn();

  //   await render(<Modal productRating={mockProductRating} productName={productName} productId={productId} test={true} onClick={handleClick}/>)
  //   screen.debug()
  //   fireEvent.click(screen.getByLabelText('modal-tester'))
  //   expect(handleClick).toHaveBeenCalled()
  // })
  it('submits form', async () => {
    const onSubmit = jest.fn()
    // const mockForm = {
    //   product_id: productId,
    //   rating: 5,
    //   summary: 'asdkjhf',
    //   body: 'asdlkhfgkawdfasdflhjdsgkjsdhagfsakjdfhgsdfkjhsdgfsdkjfhgsdkfjhsdgfkdsjfhgsdkfjsgdfksdjgfsdkfgdsfkjsdhgfskdjfhgdkfjdshgfksdjfghsdakfjshgdfksdjhfgsdkjfghsdfkjsdgfkasdjhfgsadkfjsadhgfksadfh',
    //   recommend: true,

    // }
    await render(<Modal productRating={mockProductRating} productName={productName} productId={productId} test={true} onSubmit={onSubmit} />)

    fireEvent.submit(screen.getByTestId('modal-form'));
    fireEvent.click(screen.getByText(/submit review/i))
    expect(onSubmit).toHaveBeenCalled();

    // fireEvent.click(screen.getByLabelText('modal-tester'))
    // expect(handleClick).toHaveBeenCalled()
  })
})

describe('SetStars component testing', () => {
  it('checks if component is working properly', async ()=>{
    await render(<SetStars rating={4} setRating={null}/>)

    const setStarsModal= await screen.getByTestId('ModalSetStars')
    expect(setStarsModal).toBeTruthy()
  });
  it('click handling of setStars', async () => {
    await render(<SetStars rating={4} setRating={null}/>)

    const setRate = await screen.findAllByText("★")
    expect(setRate).toBeTruthy()
  })
});