import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  thresholds: {
    http_req_duration: ['p(90)<2000'], // 90% of requests must finish under 2 sec
  },
  stages: [
    { duration: '3s', target: 1000 },
    { duration: '60s', target: 1000 },
    { duration: '5s', target: 0 },
  ],
};

export default () => {
  // pick page number up to max. Focus last 10% of dataset
  const page = Math.floor((Math.random() * 10001) + 90001);
  const count = Math.floor(Math.random() * 100); // pick count up to 100
  const res = http.get(`http://localhost:3000/api/products/?page=${page}&count=${count}`); // set api response
  sleep(1);
  check(res, {
    'is status 200': (r) => r.status === 200, // check for correct status return
  });
};
