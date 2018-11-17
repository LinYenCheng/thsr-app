import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import App from './App';

configure({ adapter: new Adapter() });

describe('Shallow', () => {
  const mockStore = configureStore();
  const initialState = {}; 
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<App store={store}/>)
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1)
  });
});
