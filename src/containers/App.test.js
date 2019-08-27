import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import App from './App';

// const faker = require('faker');
// const puppeteer = require('puppeteer');

configure({ adapter: new Adapter() });

describe('mount', () => {
  const middleWares = [thunk];
  const mockStore = configureStore(middleWares);
  const initialState = {};
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<App store={store} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});

// describe('Google', () => {
//   let browser;
//   let page;
//   beforeAll(async () => {
//     browser = await puppeteer.launch({
//       headless: false
//     });
//     page = await browser.newPage();
//     page.emulate({
//       viewport: {
//         width: 2400,
//         height: 2400
//       },
//       userAgent: ''
//     });
//     await page.goto('https://onlineclassroomdaily.liangshishu.com');
//   });

//   it('should display "google" text on page', async () => {
//     await page.evaluate(() => {
//       document.querySelector('button[type=submit]').click();
//     });
//     // await page.screenshot({ path: 'example.png' });
//     browser.close();
//   });
// });
