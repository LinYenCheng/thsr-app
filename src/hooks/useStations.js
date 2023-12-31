import useSWR from 'swr';
import { camelizeKeys } from 'humps';

const STATIONS = [
  {
    StationUID: 'THSR-0990',
    StationID: '0990',
    StationCode: 'NAK',
    StationName: {
      Zh_tw: '南港',
      En: 'Nangang',
    },
    StationAddress: '台北市南港區南港路一段313號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 121.6067816,
      PositionLat: 25.05324149,
      GeoHash: 'wsqqx0z3e',
    },
    LocationCity: '臺北市',
    LocationCityCode: 'TPE',
    LocationTown: '南港區',
    LocationTownCode: '63000090',
  },
  {
    StationUID: 'THSR-1000',
    StationID: '1000',
    StationCode: 'TPE',
    StationName: {
      Zh_tw: '台北',
      En: 'Taipei',
    },
    StationAddress: '台北市北平西路3號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 121.516983,
      PositionLat: 25.04767,
      GeoHash: 'wsqqmpvcq',
    },
    LocationCity: '臺北市',
    LocationCityCode: 'TPE',
    LocationTown: '中正區',
    LocationTownCode: '63000050',
  },
  {
    StationUID: 'THSR-1010',
    StationID: '1010',
    StationCode: 'BAC',
    StationName: {
      Zh_tw: '板橋',
      En: 'Banqiao',
    },
    StationAddress: '新北市板橋區縣民大道二段7號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 121.4642864,
      PositionLat: 25.01369021,
      GeoHash: 'wsqq7cxe7',
    },
    LocationCity: '新北市',
    LocationCityCode: 'NWT',
    LocationTown: '板橋區',
    LocationTownCode: '65000010',
  },
  {
    StationUID: 'THSR-1020',
    StationID: '1020',
    StationCode: 'TAY',
    StationName: {
      Zh_tw: '桃園',
      En: 'Taoyuan',
    },
    StationAddress: '桃園市中壢區高鐵北路一段6號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 121.214729,
      PositionLat: 25.012861,
      GeoHash: 'wsqnq33y7',
    },
    LocationCity: '桃園市',
    LocationCityCode: 'TAO',
    LocationTown: '中壢區',
    LocationTownCode: '68000020',
  },
  {
    StationUID: 'THSR-1030',
    StationID: '1030',
    StationCode: 'HSC',
    StationName: {
      Zh_tw: '新竹',
      En: 'Hsinchu',
    },
    StationAddress: '新竹縣竹北市高鐵七路6號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 121.04026,
      PositionLat: 24.808441,
      GeoHash: 'wsqj4k4zd',
    },
    LocationCity: '新竹縣',
    LocationCityCode: 'HSQ',
    LocationTown: '竹北市',
    LocationTownCode: '10004010',
  },
  {
    StationUID: 'THSR-1035',
    StationID: '1035',
    StationCode: 'MIL',
    StationName: {
      Zh_tw: '苗栗',
      En: 'Miaoli',
    },
    StationAddress: '苗栗縣後龍鎮高鐵三路268號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.825272,
      PositionLat: 24.605448,
      GeoHash: 'wsmgvrq30',
    },
    LocationCity: '苗栗縣',
    LocationCityCode: 'MIA',
    LocationTown: '後龍鎮',
    LocationTownCode: '10005060',
  },
  {
    StationUID: 'THSR-1040',
    StationID: '1040',
    StationCode: 'TAC',
    StationName: {
      Zh_tw: '台中',
      En: 'Taichung',
    },
    StationAddress: '台中市烏日區站區二路8號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.615967,
      PositionLat: 24.112484,
      GeoHash: 'wsmc0ttc7',
    },
    LocationCity: '臺中市',
    LocationCityCode: 'TXG',
    LocationTown: '烏日區',
    LocationTownCode: '66000230',
  },
  {
    StationUID: 'THSR-1043',
    StationID: '1043',
    StationCode: 'CHA',
    StationName: {
      Zh_tw: '彰化',
      En: 'Changhua',
    },
    StationAddress: '彰化縣田中鎮站區路二段99號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.574608,
      PositionLat: 23.874327,
      GeoHash: 'wsjxzdpy0',
    },
    LocationCity: '彰化縣',
    LocationCityCode: 'CHA',
    LocationTown: '田中鎮',
    LocationTownCode: '10007120',
  },
  {
    StationUID: 'THSR-1047',
    StationID: '1047',
    StationCode: 'YUL',
    StationName: {
      Zh_tw: '雲林',
      En: 'Yunlin',
    },
    StationAddress: '雲林縣虎尾鎮站前東路301號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.416512,
      PositionLat: 23.736231,
      GeoHash: 'wsjxh1h9s',
    },
    LocationCity: '雲林縣',
    LocationCityCode: 'YUN',
    LocationTown: '虎尾鎮',
    LocationTownCode: '10009030',
  },
  {
    StationUID: 'THSR-1050',
    StationID: '1050',
    StationCode: 'CHY',
    StationName: {
      Zh_tw: '嘉義',
      En: 'Chiayi',
    },
    StationAddress: '嘉義縣太保市高鐵西路168號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.323257,
      PositionLat: 23.459507,
      GeoHash: 'wsjt6n8tx',
    },
    LocationCity: '嘉義縣',
    LocationCityCode: 'CYQ',
    LocationTown: '太保市',
    LocationTownCode: '10010010',
  },
  {
    StationUID: 'THSR-1060',
    StationID: '1060',
    StationCode: 'TNN',
    StationName: {
      Zh_tw: '台南',
      En: 'Tainan',
    },
    StationAddress: '台南市歸仁區歸仁大道100號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.286201,
      PositionLat: 22.925077,
      GeoHash: 'wsjd3jmsr',
    },
    LocationCity: '臺南市',
    LocationCityCode: 'TNN',
    LocationTown: '歸仁區',
    LocationTownCode: '67000280',
  },
  {
    StationUID: 'THSR-1070',
    StationID: '1070',
    StationCode: 'ZUY',
    StationName: {
      Zh_tw: '左營',
      En: 'Zuoying',
    },
    StationAddress: '高雄市左營區高鐵路105號',
    OperatorID: 'THSR',
    UpdateTime: '2023-10-17T00:00:00+08:00',
    VersionID: 2,
    StationPosition: {
      PositionLon: 120.307487,
      PositionLat: 22.687391,
      GeoHash: 'wsj91dj5x',
    },
    LocationCity: '高雄市',
    LocationCityCode: 'KHH',
    LocationTown: '左營區',
    LocationTownCode: '64000030',
  },
];

function useStations() {
  const { data, error, isLoading } = useSWR(`/Station`);

  if (data && data?.length) {
    return {
      isLoading,
      stations: camelizeKeys(data),
    };
  }

  return {
    isLoading,
    stations: camelizeKeys(STATIONS),
  };
}

export default useStations;