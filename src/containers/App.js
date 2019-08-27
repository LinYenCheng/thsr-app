import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import moment from 'moment';

import PickerDateAndPlace from '../components/PickerDateAndPlace';
import RailTable from '../components/RailTable';

import API from '../middleware/API';
import reduxAPI from '../middleware/reduxAPI';

import '../styles/App.scss';
import { validateData } from '../util/util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSubmit: false,
      date: moment().format('YYYY-MM-DD'),
      originStation: '',
      destinationStation: '',
      availableSeats: [],
      updateTime: '',
      times: [],
      prices: [],
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
    const { dispatch } = this.props;
    dispatch(
      reduxAPI.actions.stations.sync(() => {
        const { stations } = this.props;
        const validatedStations = validateData(stations);
        if (validatedStations) {
          this.setState(
            {
              originStation: validatedStations[4].stationID,
              destinationStation: validatedStations[10].stationID,
            },
            () => {
              this.submit();
            },
          );
        }
      }),
    );
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
    this.setState(
      {
        isLoading: true,
        isSubmit: true,
      },
      () => {
        axios
          .all([
            API.get(`/AvailableSeatStatusList/${originStation}`),
            API.get(`/ODFare/${originStation}/to/${destinationStation}`),
            API.get(`/DailyTimetable/OD/${originStation}/to/${destinationStation}/${date}`),
          ])
          .then(
            axios.spread((availableSeats, prices, times) => {
              let finalState = {};
              if (
                availableSeats &&
                availableSeats[0] &&
                availableSeats[0].availableSeats &&
                availableSeats[0].availableSeats.length
              ) {
                finalState = JSON.parse(JSON.stringify(availableSeats[0]));
              }
              this.setState({
                ...finalState,
                prices: prices || [],
                times: times || [],
                isLoading: false,
              });
            }),
          );
      },
    );
  }

  render() {
    const { stations } = this.props;
    const {
      date,
      times,
      prices,
      originStation,
      destinationStation,
      updateTime,
      isLoading,
      isSubmit,
      availableSeats,
    } = this.state;

    return (
      <>
        <div className="App container">
          <div className="sticky desktop--hide">
            <PickerDateAndPlace
              date={date}
              stations={validateData(stations) || []}
              originStation={originStation}
              destinationStation={destinationStation}
              handleInputChange={this.handleInputChange}
              swapLocation={this.swapLocation}
            />
          </div>
          <div className="row content--mobile">
            <div className="col-md-8 col-sm-7 col-xs-12">
              <h2 id="title">高鐵查詢</h2>
              <RailTable
                isLoading={isLoading}
                isSubmit={isSubmit}
                date={date}
                times={times}
                prices={prices}
                destinationStation={destinationStation}
                availableSeats={availableSeats}
              />
            </div>
            <div className="col-md-4 col-sm-5 col-xs-12 sticky mobile--hide">
              <PickerDateAndPlace
                date={date}
                stations={validateData(stations) || []}
                originStation={originStation}
                destinationStation={destinationStation}
                handleInputChange={this.handleInputChange}
                swapLocation={this.swapLocation}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 center footer">
              <i className="glyphicon glyphicon-time" />
              <span>{` 更新時間:${moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}`}</span>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.stations,
});

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // stations: PropTypes.array,
};

export default connect(mapStateToProps)(App);
