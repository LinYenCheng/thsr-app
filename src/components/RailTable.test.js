import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';
import RailTable from './RailTable';

describe('Shallow', () => {
  it('renders', () => {
    const instance = shallow(<RailTable availableSeats={[]} />);
    const btnDepartureTime = instance.find('#departureTime');
    const btnTravelTime = instance.find('#travelTime');
    btnDepartureTime.simulate('click');
    btnTravelTime.simulate('click');
    expect(instance.length).toEqual(1);
  });

  it('renders searching', () => {
    const wrapper = mount(<RailTable availableSeats={[]} isLoading isSubmit />);
    // TODO: 尚有問題
    expect(wrapper.find('#row-searching')).toEqual({});
  });

  it('renders searching', () => {
    const wrapper = mount(<RailTable availableSeats={[]} isLoading={false} isSubmit />);
    // TODO: 尚有問題
    expect(wrapper.find('#row-nodata')).toEqual({});
  });

  it('renders rows', () => {
    const wrapper = mount(
      <RailTable
        date={moment().format('YYYY-MM-DD')}
        destinationStation="1060"
        availableSeats={[
          {
            trainNo: '0502',
            direction: 1,
            stationID: '1030',
            stationName: { zhTw: '新竹', en: 'Hsinchu' },
            departureTime: '23:59',
            endingStationID: '0990',
            endingStationName: { zhTw: '南港', en: 'Nangang' },
            stopStations: [
              {
                stationID: '1020',
                stationName: { zhTw: '桃園', en: 'Taoyuan' },
                standardSeatStatus: 'Available',
                businessSeatStatus: 'Available',
              },
              {
                stationID: '1010',
                stationName: { zhTw: '板橋', en: 'Banciao' },
                standardSeatStatus: 'Available',
                businessSeatStatus: 'Available',
              },
              {
                stationID: '1000',
                stationName: { zhTw: '台北', en: 'Taipei' },
                standardSeatStatus: 'Available',
                businessSeatStatus: 'Available',
              },
              {
                stationID: '0990',
                stationName: { zhTw: '南港', en: 'Nangang' },
                standardSeatStatus: 'Available',
                businessSeatStatus: 'Available',
              },
            ],
            srcRecTime: '2019-08-27T11:09:02+08:00',
            updateTime: '2019-08-27T11:14:54+08:00',
          },
        ]}
        prices={[
          {
            originStationID: '1030',
            originStationName: { zhTw: '新竹', en: 'Hsinchu' },
            destinationStationID: '1060',
            destinationStationName: { zhTw: '台南', en: 'Tainan' },
            direction: 0,
            fares: [
              { ticketType: '標準', price: 1060 },
              { ticketType: '自由', price: 1025 },
              { ticketType: '商務', price: 1790 },
            ],
            srcUpdateTime: '2016-06-12T13:00:00+08:00',
            updateTime: '2019-08-26T23:09:40+08:00',
            versionID: 5182,
          },
        ]}
        times={[
          {
            trainDate: moment().format('YYYY-MM-DD'),
            dailyTrainInfo: {
              trainNo: '0675',
              direction: 0,
              startingStationID: '0990',
              startingStationName: { zhTw: '南港', en: 'Nangang' },
              endingStationID: '1070',
              endingStationName: { zhTw: '左營', en: 'Zuoying' },
              note: {},
            },
            originStopTime: {
              stopSequence: 5,
              stationID: '1030',
              stationName: { zhTw: '新竹', en: 'Hsinchu' },
              arrivalTime: '19:21',
              departureTime: '19:22',
            },
            destinationStopTime: {
              stopSequence: 8,
              stationID: '1060',
              stationName: { zhTw: '台南', en: 'Tainan' },
              arrivalTime: '20:32',
              departureTime: '20:33',
            },
            updateTime: '2019-07-31T00:00:00+08:00',
            versionID: 1,
          },
        ]}
        isLoading={false}
        isSubmit
      />,
    );
    const btnTravelTime = wrapper.find('#travelTime');
    btnTravelTime.simulate('click');
  });
});
