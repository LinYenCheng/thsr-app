import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import rest from './rest';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import App from './App';

configure({ adapter: new Adapter() });

function mockFetchAdapter() {
  return (url, opts) => {
    console.log('********');
  };
}

const mockStations = {
  data: {
    "status": 1, "result": [{ "stationID": "0990", "stationName": { "zhTw": "南港", "en": "Nangang" }, "stationPosition": { "positionLat": 25.05318832397461, "positionLon": 121.60706329345703 }, "stationAddress": "台北市南港區南港路一段313號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1000", "stationName": { "zhTw": "台北", "en": "Taipei" }, "stationPosition": { "positionLat": 25.047670364379883, "positionLon": 121.51698303222656 }, "stationAddress": "台北市北平西路3號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1010", "stationName": { "zhTw": "板橋", "en": "Banciao" }, "stationPosition": { "positionLat": 25.013870239257812, "positionLon": 121.46459197998047 }, "stationAddress": "新北市板橋區縣民大道二段7號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1020", "stationName": { "zhTw": "桃園", "en": "Taoyuan" }, "stationPosition": { "positionLat": 25.012861251831055, "positionLon": 121.21472930908203 }, "stationAddress": "桃園市中壢區高鐵北路一段6號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1030", "stationName": { "zhTw": "新竹", "en": "Hsinchu" }, "stationPosition": { "positionLat": 24.808441162109375, "positionLon": 121.0402603149414 }, "stationAddress": "新竹縣竹北市高鐵七路6號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1035", "stationName": { "zhTw": "苗栗", "en": "Miaoli" }, "stationPosition": { "positionLat": 24.60544776916504, "positionLon": 120.82527160644531 }, "stationAddress": "苗栗縣後龍鎮高鐵三路268號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1040", "stationName": { "zhTw": "台中", "en": "Taichung" }, "stationPosition": { "positionLat": 24.112483978271484, "positionLon": 120.615966796875 }, "stationAddress": "台中市烏日區站區二路8號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1043", "stationName": { "zhTw": "彰化", "en": "Changhua" }, "stationPosition": { "positionLat": 23.874326705932617, "positionLon": 120.5746078491211 }, "stationAddress": "彰化縣田中鎮站區路二段99號", "operatorID": "THSR", "updateTime": "2017-06-28T00:00:00+08:00", "versionID": 1 }, { "stationID": "1047", "stationName": { "zhTw": "雲林", "en": "Yunlin" }, "stationPosition": { "positionLat": 23.736230850219727, "positionLon": 120.41651153564453 }, "stationAddress": "雲林縣虎尾鎮站前東路301號", "operatorID": "THSR", "updateTime": "2017-06-28T00:00:00+08:00", "versionID": 1 }, { "stationID": "1050", "stationName": { "zhTw": "嘉義", "en": "Chiayi" }, "stationPosition": { "positionLat": 23.45950698852539, "positionLon": 120.32325744628906 }, "stationAddress": "嘉義縣太保市高鐵西路168號", "operatorID": "THSR", "updateTime": "2017-06-28T00:00:00+08:00", "versionID": 1 }, { "stationID": "1060", "stationName": { "zhTw": "台南", "en": "Tainan" }, "stationPosition": { "positionLat": 22.925077438354492, "positionLon": 120.28620147705078 }, "stationAddress": "台南市歸仁區歸仁大道100號", "operatorID": "THSR", "updateTime": "2017-04-11T11:05:00+08:00", "versionID": 1 }, { "stationID": "1070", "stationName": { "zhTw": "左營", "en": "Zuoying" }, "stationPosition": { "positionLat": 22.68739128112793, "positionLon": 120.30748748779297 }, "stationAddress": "高雄市左營區高鐵路105號", "operatorID": "THSR", "updateTime": "2017-06-28T00:00:00+08:00", "versionID": 1 }]
  }
};

rest.use('fetch', mockFetchAdapter);

describe('Shallow', () => {
  const mockStore = configureStore();
  const initialState = {};
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<App store={store} stations={mockStations} />)
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1)
  });
});
