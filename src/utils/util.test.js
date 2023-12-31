import { expect, describe, it } from 'vitest';
import { getItemsWithDepartureTimeAfterNow, getTravelTime, getItemsWithTravelTimes } from './util';

const mockItems = {
  date: '2018-11-20',
  finalData: [
    {
      stationName: '台北',
      destinationStationName: '板橋',
      arrivalTime: '06:33',
      departureTime: '06:26',
      travelTime: '00:07',
      trainDate: '2023-11-06',
      dailyTrainInfo: {
        trainNo: '0803',
        direction: 0,
        startingStationID: '0990',
        startingStationName: {
          zhTw: '南港',
          en: 'Nangang',
        },
        endingStationID: '1070',
        endingStationName: {
          zhTw: '左營',
          en: 'Zuoying',
        },
        note: {},
      },
      originStopTime: {
        stopSequence: 2,
        stationID: '1000',
        stationName: {
          zhTw: '台北',
          en: 'Taipei',
        },
        arrivalTime: '06:23',
        departureTime: '06:26',
      },
      destinationStopTime: {
        stopSequence: 3,
        stationID: '1010',
        stationName: {
          zhTw: '板橋',
          en: 'Banqiao',
        },
        arrivalTime: '06:33',
        departureTime: '06:34',
      },
      updateTime: '2023-10-12T14:39:58+08:00',
      versionID: 2,
    },
    {
      stationName: '台北',
      destinationStationName: '板橋',
      arrivalTime: '06:37',
      departureTime: '06:30',
      travelTime: '00:07',
      trainDate: '2023-11-06',
      dailyTrainInfo: {
        trainNo: '0203',
        direction: 0,
        startingStationID: '1000',
        startingStationName: {
          zhTw: '台北',
          en: 'Taipei',
        },
        endingStationID: '1070',
        endingStationName: {
          zhTw: '左營',
          en: 'Zuoying',
        },
        note: {},
      },
      originStopTime: {
        stopSequence: 1,
        stationID: '1000',
        stationName: {
          zhTw: '台北',
          en: 'Taipei',
        },
        arrivalTime: '06:30',
        departureTime: '06:30',
      },
      destinationStopTime: {
        stopSequence: 2,
        stationID: '1010',
        stationName: {
          zhTw: '板橋',
          en: 'Banqiao',
        },
        arrivalTime: '06:37',
        departureTime: '06:38',
      },
      updateTime: '2023-10-12T14:39:58+08:00',
      versionID: 2,
    },
  ],
};

describe.concurrent('util', () => {
  it('should calculate the correct travel time', () => {
    const date = '2023-12-10';
    const start = '08:00';
    const end = '10:30';
    const expectedTravelTime = '02:30';

    const result = getTravelTime(date, start, end);

    expect(result).toBe(expectedTravelTime);
  });

  it('get items with departure time after now', () => {
    mockItems.active = true;
    mockItems.departureTimeDSC = true;
    // expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual(mockItems);
    mockItems.departureTimeDSC = false;
    expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual([]);

    console.log(getItemsWithDepartureTimeAfterNow(mockItems));
    mockItems.active = false;
    expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual([]);
  });

  it('get items with travel times', () => {
    expect(getItemsWithTravelTimes(mockItems)).toHaveLength(2);
  });
});
