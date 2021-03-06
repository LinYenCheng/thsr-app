import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';
import { camelizeKeys } from 'humps';

let isModalOpen = false;
const API_URL = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR';

/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ['錯誤'] });
}

/**
 * parse response
 */
function parseBody(response) {
  if (response.status === 200) {
    if (process.env.NODE_ENV === 'development') {
      console.log({
        url: response.config.url,
        result: response.data
      });
    }
    return response.data;
  }
  return this.parseError(response.data.messages);
}

/**
 * axios instance
 */
const API = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  responseType: 'json',
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  }
});

// API.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     console.warn('Error status', error.response);
//     // return Promise.reject(error)
//     if (error.response) {
//       return parseError(error.response.data);
//     }
//     return Promise.reject(error);
//   },
// );

// response parse
API.interceptors.response.use(
  response => parseBody(camelizeKeys(response)),
  error => {
    console.warn('Error status', error.response);
    // return Promise.reject(error)
    if (error.response) {
      if (error.response.status === 403) {
        if (!isModalOpen) {
          Swal({
            type: 'error',
            title: '請更換日期',
            showConfirmButton: false,
            showCloseButton: true,
            onClose: () => {
              isModalOpen = false;
            }
          });
        }
      } else if (error.response.status === 500) {
        if (!isModalOpen) {
          Swal({
            type: 'error',
            title: '連線或伺服器發生錯誤',
            showConfirmButton: false,
            showCloseButton: true,
            onClose: () => {
              isModalOpen = false;
            }
          });
        }
      }
      return parseError(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default API;
