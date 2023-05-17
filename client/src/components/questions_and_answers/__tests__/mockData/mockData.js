export const mockData = [
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
  },
  {
    product_id: 1234,
    results: [
      {
        question_id: 100,
        question_body: 'How do it be?',
        question_date: '2023-03-24T00:00:00.000Z',
        asker_name: 'Jest2',
        question_helpfulness: 0,
        reported: false,
        answers: {},
      },
      {
        question_id: 101,
        question_body: 'How do it be?',
        question_date: '2023-03-24T00:00:00.000Z',
        asker_name: 'Jest2',
        question_helpfulness: 0,
        reported: false,
        answers: {
          110: {
            id: 110,
            body: 'yea',
            date: '2023-03-29T00:00:00.000Z',
            answerer_name: 'tester',
            helpfulness: 10,
            photos: [],
          },
        },
      },
    ],
  },
];

export const mockAnswer = [
  {
    110: {
      id: 110,
      body: 'yea',
      date: '2023-03-29T00:00:00.000Z',
      answerer_name: 'tester',
      helpfulness: 12,
      photos: [],
    },
    111: {
      id: 111,
      body: 'yea',
      date: '2023-03-29T00:00:00.000Z',
      answerer_name: 'yup',
      helpfulness: 10,
      photos: [],
    },
  },
];
