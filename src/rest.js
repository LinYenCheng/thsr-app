import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR';
const jsonOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// redux-api documentation: https://github.com/lexich/redux-api/blob/master/docs/DOCS.md
export default reduxApi({
  availableSeats: {
    url: '/AvailableSeatStatusList/:stationId',
    options: jsonOptions,
  },
})
  .use('responseHandler', (err, data) => {
    if (err) {
      if (err.status === 401) {
        console.log('error');
      }
      if (err.status === 500 || err) {
        console.log('error');
      }
    } else if (data) {
      return camelizeKeys(data);
    }
    return { status: 0 };
  })
  .use('options', (url, params, getState) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return { headers };
  })
  .use('fetch', adapterFetch(fetch))
  .use('rootUrl', API_URL);
