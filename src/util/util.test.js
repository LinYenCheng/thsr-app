import {
  validateData,
  getItemsWithDepartureTimeAfterNow,
  getItemsWithAvailableSeats,
  getDestinationInfo,
  getItemsWithTravelTimes,
} from './util';

const mockItems = {
  date: '2018-11-20',
  finalData: [
    {
      trainNo: '0567',
      direction: 0,
      stationID: '0990',
      stationName: {
        zhTw: '南港',
        en: 'Nangang',
      },
      departureTime: '23:59',
      endingStationID: '1040',
      endingStationName: {
        zhTw: '台中',
        en: 'Taichung',
      },
      stopStations: [
        {
          stationID: '1000',
          stationName: {
            zhTw: '台北',
            en: 'Taipei',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
        {
          stationID: '1010',
          stationName: {
            zhTw: '板橋',
            en: 'Banciao',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
        {
          stationID: '1020',
          stationName: {
            zhTw: '桃園',
            en: 'Taoyuan',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
        {
          stationID: '1030',
          stationName: {
            zhTw: '新竹',
            en: 'Hsinchu',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
        {
          stationID: '1035',
          stationName: {
            zhTw: '苗栗',
            en: 'Miaoli',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
        {
          stationID: '1040',
          stationName: {
            zhTw: '台中',
            en: 'Taichung',
          },
          standardSeatStatus: 'Available',
          businessSeatStatus: 'Available',
        },
      ],
      srcRecTime: '2018-11-20T15:23:02+08:00',
      updateTime: '2018-11-20T15:32:08+08:00',
    },
  ],
};

const mockResultItems = [
  {
    trainNo: '0567',
    direction: 0,
    stationID: '0990',
    stationName: {
      zhTw: '南港',
      en: 'Nangang',
    },
    departureTime: '23:59',
    endingStationID: '1040',
    endingStationName: {
      zhTw: '台中',
      en: 'Taichung',
    },
    stopStations: [
      {
        stationID: '1000',
        stationName: {
          zhTw: '台北',
          en: 'Taipei',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
      {
        stationID: '1010',
        stationName: {
          zhTw: '板橋',
          en: 'Banciao',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
      {
        stationID: '1020',
        stationName: {
          zhTw: '桃園',
          en: 'Taoyuan',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
      {
        stationID: '1030',
        stationName: {
          zhTw: '新竹',
          en: 'Hsinchu',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
      {
        stationID: '1035',
        stationName: {
          zhTw: '苗栗',
          en: 'Miaoli',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
      {
        stationID: '1040',
        stationName: {
          zhTw: '台中',
          en: 'Taichung',
        },
        standardSeatStatus: 'Available',
        businessSeatStatus: 'Available',
      },
    ],
    srcRecTime: '2018-11-20T15:23:02+08:00',
    updateTime: '2018-11-20T15:32:08+08:00',
  },
];

const mockTimes = [
  {
    trainDate: '2018-11-20',
    dailyTrainInfo: {
      trainNo: '0567',
      direction: 0,
      startingStationID: '0990',
      startingStationName: {
        zhTw: '南港',
        en: 'Nangang',
      },
      endingStationID: '1040',
      endingStationName: {
        zhTw: '台中',
        en: 'Taichung',
      },
      note: {},
    },
    originStopTime: {
      stopSequence: 1,
      stationID: '0990',
      stationName: {
        zhTw: '南港',
        en: 'Nangang',
      },
      arrivalTime: '22:50',
      departureTime: '22:50',
    },
    destinationStopTime: {
      stopSequence: 7,
      stationID: '1040',
      stationName: {
        zhTw: '台中',
        en: 'Taichung',
      },
      arrivalTime: '23:59',
      departureTime: '23:59',
    },
    updateTime: '2018-10-24T00:00:00+08:00',
    versionID: 1,
  },
];

describe('util', () => {
  it('get validated data', () => {
    expect(validateData({ data: { status: 0 } })).toBe(0);
    expect(validateData({ data: { status: 1, result: 123 } })).toBe(123);
  });

  it('get items with departure time after now', () => {
    mockItems.active = true;
    mockItems.departureTimeDSC = true;
    // expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual(mockItems);
    mockItems.departureTimeDSC = false;
    expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual([]);
    mockItems.active = false;
    expect(getItemsWithDepartureTimeAfterNow(mockItems)).toEqual([]);
  });

  it('get items with available seats', () => {
    expect(getItemsWithAvailableSeats('1040', mockResultItems)).toEqual(mockResultItems);
    mockResultItems[0].stopStations[5].standardSeatStatus = 'Full';
    mockResultItems[0].stopStations[5].businessSeatStatus = 'Full';
    expect(getItemsWithAvailableSeats('1040', mockResultItems)).toEqual([]);
    mockResultItems[0].stopStations[5].stationID = '0';
    expect(getItemsWithAvailableSeats('1040', mockResultItems)).toEqual(mockResultItems);
  });

  it('get destination information', () => {
    expect(getDestinationInfo('0567', mockTimes)).toEqual({
      stopSequence: 7,
      stationID: '1040',
      stationName: {
        zhTw: '台中',
        en: 'Taichung',
      },
      arrivalTime: '23:59',
      departureTime: '23:59',
    });
  });

  it('get items with travel times', () => {
    const mockData = { times: mockTimes, finalData: mockItems.finalData };
    mockData.travelTimeDSC = true;
    mockData.active = true;
    expect(getItemsWithTravelTimes(mockData)).toHaveLength(1);
    mockData.active = false;
    expect(getItemsWithTravelTimes(mockData)).toHaveLength(1);
  });
});
