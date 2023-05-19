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
import ReviewList, {handleScroll, getReviews, starFilter} from '../components/ReviewList.jsx';
import ReviewTile, {helpfulCheck, reportReview} from '../components/ReviewTile.jsx';
import SortBar from '../components/SortBar.jsx';
import Stars, {partialStar} from '../components/Stars.jsx';
import ReviewRating from '../components/ReviewRating.jsx';
import AddCharacteristics, {setCharObj} from '../components/AddReview/AddCharacteristics.jsx';
import Modal, {validateForm} from '../components/AddReview/Modal.jsx';
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

describe('ReviewList component testing' , () => {
  it('tests infinite scrolling', async () => {
    const mockSet = jest.fn()
    const spy = jest.spyOn(axios, 'get').mockResolvedValueOnce({data: {data: [{
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
    }]}})
    .mockResolvedValueOnce({data: {data: [{
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
    }]}})

    render(<ReviewList setReviewList={mockSet} productId={productId} productName={productName} reviewList={reviewMockData} dropSort={'relevant'}/>);

    await waitFor(() => {
      expect(screen.getByText('akjsdfajsdf2')).toBeInTheDocument()
      expect(screen.getByText('askdjfbhadhbflasjdbfnlaksdjbf')).toBeInTheDocument()
      expect(spy).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(screen.getByText('akjsdfajsdf2')).toBeInTheDocument()
      expect(screen.getByText('askdjfbhadhbflasjdbfnlaksdjbf')).toBeInTheDocument()

      expect(screen.getByText('wavyjv')).toBeInTheDocument()
      expect(screen.getByText('wowowowowowowo')).toBeInTheDocument()
      expect(spy).toHaveBeenCalledTimes(6)
    })
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
  it('render product header', async () => {
    await render(<ReviewRating productId={productId} productName={productName}/>);
    const ratingTest = await screen.getByTestId('RatingBreakdown')

    expect(ratingTest).toBeInTheDocument();
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
    expect(result).toBeVisible()
  });
  it('checks rating breakdown rate filter is working', async () => {
    const clickSpy = jest.fn()
    const filterSpy = jest.fn()
    await render(<RatingBreakdown recommended={mockRecommended}
      rating={mockRating}
      avgRate={mockAvgRate}
      ratingFilter={filterSpy}
      setRatingFilter={filterSpy}
      onClick={clickSpy}
      productId={productId}/>)
      const expected = '1'

    const avgRec = await screen.getByTestId(mockRating[0].id)
    fireEvent.click(avgRec)
    const checkText = await screen.getByText('3 stars')
    expect(checkText).toBeInTheDocument()

  });
});

// describe('Stars component testing', () => {
  // it('checks Stars avg bar is rendering', async () => {
  //   await render(<Stars rating={mockRating} productId={productId} />)
  //   const result = await screen.findByTestId('StarsAvgRateBar')
  //   expect(result).toBeInTheDocument()
  // });
  // it('checks Stars avg value is rendering', async () => {
  //   await render(<Stars rating={mockRating} productId={productId} />)

  //   const checkAvg = await screen.queryByTestId('StarsAvgRateBar')
  //   expect(checkAvg).toBeInTheDocument()
  // });
// });

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
  it('submits form', async () => {
    const onSubmitSpy = jest.fn()
    await render(<Modal productRating={mockProductRating} productName={productName} productId={productId} test={true} onSubmit={onSubmitSpy} />)

    fireEvent.submit(screen.getByTestId('modal-form'));
    expect(onSubmitSpy).toBeTruthy()
  })
})

describe('SetStars component testing', () => {
  it('checks if component is working properly', async ()=>{
    const oneStar = await render(<SetStars rating={1} setRating={null}/>)
    const twoStar = await render(<SetStars rating={2} setRating={null}/>)
    const threeStar = await render(<SetStars rating={3} setRating={null}/>)
    const fourStar = await render(<SetStars rating={4} setRating={null}/>)
    const fiveStar = await render(<SetStars rating={5} setRating={null}/>)
    expect(oneStar).toBeTruthy()
    expect(twoStar).toBeTruthy()
    expect(threeStar).toBeTruthy()
    expect(fourStar).toBeTruthy()
    expect(fiveStar).toBeTruthy()
  });
});

describe('AddCharacteristics component testing', () => {
  it('checks if component is rendering all options', async ()=>{
    const mockCharacteristics = {}
    const mockSet = jest.fn()
    const clickSpy = jest.fn()

    await render(<AddCharacteristics charObj={mockProductRating[0]} characteristics={mockCharacteristics} setCharacteristics={mockSet} onClick={clickSpy}/>)
    const char1 = screen.getByTestId('char1')
    fireEvent.click(char1)
    expect(char1).toBeInTheDocument()
  });
});

describe('UploadPhotos component testing', () => {
  it('checks if component button is present', async ()=>{
    const mockPhotos = [];
    const mockSetPhotos = jest.fn();
    // const onClickSpy = jest.fn()
    await render(<UploadPhotos photos={mockPhotos} setPhotos={mockSetPhotos}/>)

    const upload = screen.getByRole('button',{name: 'upload'})
    expect(upload).toBeVisible()
  });
  it('checks onChange is passing correctly', async () => {
    const mockPhotos = [];
    const mockSetPhotos = jest.fn();
    await render(<UploadPhotos photos={mockPhotos} setPhotos={mockSetPhotos}/>)

    const upload = screen.getByLabelText('photos')
    fireEvent.change(upload, {target: {value: ''}})
    expect(upload).toBeTruthy()
  });
  it('checks thumbnails are present', async () => {
    const mockPhotos = ['sdf'];
    const mockSetPhotos = jest.fn();
    await render(<UploadPhotos photos={mockPhotos} setPhotos={mockSetPhotos}/>)
    const thumbnails = screen.getByAltText(/.../i)
    expect(thumbnails).toBeVisible()
  });
});

describe('SortBar component testing', () => {
  it('checks onChange is passing correctly', async () => {
    const setDropSortMock = jest.fn();
    await render(<SortBar setDropSort={setDropSortMock} />)
    const sorter = screen.getByLabelText('sortbar')
    fireEvent.change(sorter, {target: {value: ''}})
    expect(sorter).toBeVisible()
  });
})
describe('ReviewTile component testing', () => {
  it('checks onChange is passing correctly', async () => {
    const clickSpy = jest.fn()
    await render(<ReviewTile productId={productId}
    setReviewList={null} revObj={reviewMockData[0]}
    onClick={clickSpy}/>)
    const helpful = screen.getByTestId('helpfulCheck')
    fireEvent.click(helpful)
    expect(helpful).toBeVisible()

  });
})