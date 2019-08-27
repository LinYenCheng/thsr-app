import React from 'react';
import { shallow } from 'enzyme';
import PickerDateAndPlace from './PickerDateAndPlace';

describe('Shallow', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <PickerDateAndPlace
        stations={[
          {
            stationID: '0',
            stationName: {
              zhTw: 'test',
            },
          },
        ]}
      />,
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('#originStation').props().value).toBe('1030');
    expect(wrapper.find('#destinationStation').props().value).toBe('1060');
  });
});
