export interface IStation {
  stationUID: string;
  stationID: string;
  stationCode: string;
  stationName: {
    zhTw: string;
    en: string;
  };
  stationAddress: string;
  operatorID: string;
  updateTime: string;
  versionID: number;
  stationPosition: {
    positionLon: number;
    positionLat: number;
    geoHash: string;
  };
  locationCity: string;
  locationCityCode: string;
  locationTown: string;
  locationTownCode: string;
}

export const STATIONS = [
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

export const CAMELIZE_STATIONS: IStation[] = [
    {
        "stationUID": "THSR-0990",
        "stationID": "0990",
        "stationCode": "NAK",
        "stationName": {
            "zhTw": "南港",
            "en": "Nangang"
        },
        "stationAddress": "台北市南港區南港路一段313號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 121.6067816,
            "positionLat": 25.05324149,
            "geoHash": "wsqqx0z3e"
        },
        "locationCity": "臺北市",
        "locationCityCode": "TPE",
        "locationTown": "南港區",
        "locationTownCode": "63000090"
    },
    {
        "stationUID": "THSR-1000",
        "stationID": "1000",
        "stationCode": "TPE",
        "stationName": {
            "zhTw": "台北",
            "en": "Taipei"
        },
        "stationAddress": "台北市北平西路3號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 121.516983,
            "positionLat": 25.04767,
            "geoHash": "wsqqmpvcq"
        },
        "locationCity": "臺北市",
        "locationCityCode": "TPE",
        "locationTown": "中正區",
        "locationTownCode": "63000050"
    },
    {
        "stationUID": "THSR-1010",
        "stationID": "1010",
        "stationCode": "BAC",
        "stationName": {
            "zhTw": "板橋",
            "en": "Banqiao"
        },
        "stationAddress": "新北市板橋區縣民大道二段7號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 121.4642864,
            "positionLat": 25.01369021,
            "geoHash": "wsqq7cxe7"
        },
        "locationCity": "新北市",
        "locationCityCode": "NWT",
        "locationTown": "板橋區",
        "locationTownCode": "65000010"
    },
    {
        "stationUID": "THSR-1020",
        "stationID": "1020",
        "stationCode": "TAY",
        "stationName": {
            "zhTw": "桃園",
            "en": "Taoyuan"
        },
        "stationAddress": "桃園市中壢區高鐵北路一段6號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 121.214729,
            "positionLat": 25.012861,
            "geoHash": "wsqnq33y7"
        },
        "locationCity": "桃園市",
        "locationCityCode": "TAO",
        "locationTown": "中壢區",
        "locationTownCode": "68000020"
    },
    {
        "stationUID": "THSR-1030",
        "stationID": "1030",
        "stationCode": "HSC",
        "stationName": {
            "zhTw": "新竹",
            "en": "Hsinchu"
        },
        "stationAddress": "新竹縣竹北市高鐵七路6號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 121.04026,
            "positionLat": 24.808441,
            "geoHash": "wsqj4k4zd"
        },
        "locationCity": "新竹縣",
        "locationCityCode": "HSQ",
        "locationTown": "竹北市",
        "locationTownCode": "10004010"
    },
    {
        "stationUID": "THSR-1035",
        "stationID": "1035",
        "stationCode": "MIL",
        "stationName": {
            "zhTw": "苗栗",
            "en": "Miaoli"
        },
        "stationAddress": "苗栗縣後龍鎮高鐵三路268號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.825272,
            "positionLat": 24.605448,
            "geoHash": "wsmgvrq30"
        },
        "locationCity": "苗栗縣",
        "locationCityCode": "MIA",
        "locationTown": "後龍鎮",
        "locationTownCode": "10005060"
    },
    {
        "stationUID": "THSR-1040",
        "stationID": "1040",
        "stationCode": "TAC",
        "stationName": {
            "zhTw": "台中",
            "en": "Taichung"
        },
        "stationAddress": "台中市烏日區站區二路8號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.615967,
            "positionLat": 24.112484,
            "geoHash": "wsmc0ttc7"
        },
        "locationCity": "臺中市",
        "locationCityCode": "TXG",
        "locationTown": "烏日區",
        "locationTownCode": "66000230"
    },
    {
        "stationUID": "THSR-1043",
        "stationID": "1043",
        "stationCode": "CHA",
        "stationName": {
            "zhTw": "彰化",
            "en": "Changhua"
        },
        "stationAddress": "彰化縣田中鎮站區路二段99號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.574608,
            "positionLat": 23.874327,
            "geoHash": "wsjxzdpy0"
        },
        "locationCity": "彰化縣",
        "locationCityCode": "CHA",
        "locationTown": "田中鎮",
        "locationTownCode": "10007120"
    },
    {
        "stationUID": "THSR-1047",
        "stationID": "1047",
        "stationCode": "YUL",
        "stationName": {
            "zhTw": "雲林",
            "en": "Yunlin"
        },
        "stationAddress": "雲林縣虎尾鎮站前東路301號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.416512,
            "positionLat": 23.736231,
            "geoHash": "wsjxh1h9s"
        },
        "locationCity": "雲林縣",
        "locationCityCode": "YUN",
        "locationTown": "虎尾鎮",
        "locationTownCode": "10009030"
    },
    {
        "stationUID": "THSR-1050",
        "stationID": "1050",
        "stationCode": "CHY",
        "stationName": {
            "zhTw": "嘉義",
            "en": "Chiayi"
        },
        "stationAddress": "嘉義縣太保市高鐵西路168號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.323257,
            "positionLat": 23.459507,
            "geoHash": "wsjt6n8tx"
        },
        "locationCity": "嘉義縣",
        "locationCityCode": "CYQ",
        "locationTown": "太保市",
        "locationTownCode": "10010010"
    },
    {
        "stationUID": "THSR-1060",
        "stationID": "1060",
        "stationCode": "TNN",
        "stationName": {
            "zhTw": "台南",
            "en": "Tainan"
        },
        "stationAddress": "台南市歸仁區歸仁大道100號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.286201,
            "positionLat": 22.925077,
            "geoHash": "wsjd3jmsr"
        },
        "locationCity": "臺南市",
        "locationCityCode": "TNN",
        "locationTown": "歸仁區",
        "locationTownCode": "67000280"
    },
    {
        "stationUID": "THSR-1070",
        "stationID": "1070",
        "stationCode": "ZUY",
        "stationName": {
            "zhTw": "左營",
            "en": "Zuoying"
        },
        "stationAddress": "高雄市左營區高鐵路105號",
        "operatorID": "THSR",
        "updateTime": "2023-10-17T00:00:00+08:00",
        "versionID": 2,
        "stationPosition": {
            "positionLon": 120.307487,
            "positionLat": 22.687391,
            "geoHash": "wsj91dj5x"
        },
        "locationCity": "高雄市",
        "locationCityCode": "KHH",
        "locationTown": "左營區",
        "locationTownCode": "64000030"
    }
];