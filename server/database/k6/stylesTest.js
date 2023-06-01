import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(90)<2000'], // 90% of requests must finish under 2 sec
  },
};

export default () => {
  // pick page number up to max. Focus last 10% of dataset
  const product_id = Math.floor((Math.random() * 100002) + 900009);
  const res = http.get(`http://localhost:3000/api/products/${product_id}/styles`); // set api response
  sleep(1);
  check(res, { 'status is 200': (r) => r.status === 200 });
};
