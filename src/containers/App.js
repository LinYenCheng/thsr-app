import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { camelizeKeys } from 'humps';

import PickerDateAndPlace from '../components/PickerDateAndPlace';
import RailTable from '../components/RailTable';

import API from '../middleware/API';

import '../styles/App.scss';

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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSubmit: false,
      date: moment().format('YYYY-MM-DD'),
      stations: [],
      originStation: localStorage.getItem('originStation') || '',
      destinationStation: localStorage.getItem('destinationStation') || '',
      updateTime: '',
      times: [],
      isMobile: window.innerWidth < 768, // 假設小於768px寬度視為手機板
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.swapLocation = () => {
      const { originStation, destinationStation } = this.state;
      this.setState(
        {
          originStation: destinationStation,
          destinationStation: originStation,
        },
        this.submit,
      );
    };
  }

  componentDidMount() {
    const m = this;
    const data = camelizeKeys(STATIONS);
    this.setState(
      {
        stations: data,
        originStation: localStorage.getItem('originStation') || data[4].stationID,
        destinationStation: localStorage.getItem('destinationStation') || data[10].stationID,
      },
      () => {
        m.submit();
      },
    );
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      isMobile: window.innerWidth < 768,
    });
  }

  handleInputChange(event) {
    const m = this;
    const {
      target: { type, name, checked, value },
    } = event;
    const { originStation, destinationStation } = this.state;
    event.preventDefault();
    if (
      (name !== 'originStation' && name !== 'destinationStation') ||
      (name === 'originStation' && value !== destinationStation) ||
      (name === 'destinationStation' && value !== originStation)
    ) {
      this.setState(
        {
          isSubmit: false,
          [name]: type === 'checkbox' ? checked : value,
        },
        m.submit,
      );
    } else {
      Swal.fire({
        icon: 'info',
        type: 'warn',
        timer: 5000,
        title: '起點和終點需不同',
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  }

  submit() {
    const { originStation, destinationStation, date } = this.state;
    localStorage.setItem('originStation', originStation);
    localStorage.setItem('destinationStation', destinationStation);
    this.setState(
      {
        isLoading: true,
        isSubmit: true,
      },
      () => {
        API.get(`/DailyTimetable/OD/${originStation}/to/${destinationStation}/${date}`).then(
          (times) => {
            this.setState({
              times: times || [],
              isLoading: false,
              updateTime: times[0]?.updateTime,
            });
          },
        );
      },
    );
  }

  render() {
    const { isMobile, stations } = this.state;
    const { date, times, originStation, destinationStation, updateTime, isLoading, isSubmit } =
      this.state;

    return (
      <>
        <div className="App container">
          <div className="row content--mobile">
            <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12 sticky mobile--hide">
              <PickerDateAndPlace
                date={date}
                stations={stations}
                originStation={originStation}
                destinationStation={destinationStation}
                handleInputChange={this.handleInputChange}
                swapLocation={this.swapLocation}
              />
              <br />
              {!isMobile && (
                <div className="google-ad">
                  <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-1297466993744883"
                    data-ad-slot="9012117796"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  ></ins>
                </div>
              )}
            </div>
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              <h3 id="title">高鐵班次時刻表快速查詢</h3>
              <RailTable
                isLoading={isLoading}
                isSubmit={isSubmit}
                date={date}
                times={times}
                destinationStation={destinationStation}
              />
              {!isMobile && (
                <div className="google-ad mobile--hide">
                  <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-format="fluid"
                    data-ad-layout-key="-h4+1+1q-1t-2x"
                    data-ad-client="ca-pub-1297466993744883"
                    data-ad-slot="9012117796"
                  ></ins>
                </div>
              )}
            </div>
          </div>
          {isMobile && (
            <div className="google-ad">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1297466993744883"
                data-ad-slot="9012117796"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          )}
          <div className="position-fixed desktop--hide">
            <PickerDateAndPlace
              isMobile={isMobile}
              date={date}
              stations={stations}
              originStation={originStation}
              destinationStation={destinationStation}
              handleInputChange={this.handleInputChange}
              swapLocation={this.swapLocation}
            />
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 center footer">
              <i className="glyphicon glyphicon-time" />
              <span>{` 更新時間:${moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}`}</span>
              <br />
              <span>
                Copyright ©{' '}
                <a href="https://linyencheng.github.io/" target="_blank" rel="noreferrer">
                  前端三分鐘
                </a>{' '}
                2022
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

App.propTypes = {
  // stations: PropTypes.array,
};

export default App;
