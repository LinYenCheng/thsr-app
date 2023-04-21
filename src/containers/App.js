import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import moment from 'moment';

import PickerDateAndPlace from '../components/PickerDateAndPlace';
import RailTable from '../components/RailTable';

import API from '../middleware/API';

import '../styles/App.scss';

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
    };
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
    API.get(`/Station`).then((data) => {
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
      swal({
        type: 'info',
        timer: 1000,
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
    const { stations } = this.state;
    const { date, times, originStation, destinationStation, updateTime, isLoading, isSubmit } =
      this.state;

    return (
      <>
        <div className="App container">
          <div className="row content--mobile">
            <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
              <h3 id="title">高鐵班次時刻表快速查詢</h3>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-h4+1+1q-1t-2x"
                data-ad-client="ca-pub-1297466993744883"
                data-ad-slot="6263096726"
              ></ins>
              <RailTable
                isLoading={isLoading}
                isSubmit={isSubmit}
                date={date}
                times={times}
                destinationStation={destinationStation}
              />
            </div>
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
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1297466993744883"
                data-ad-slot="9240487898"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
          <div className="position-fixed desktop--hide">
            <PickerDateAndPlace
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
