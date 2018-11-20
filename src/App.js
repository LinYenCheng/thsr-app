import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import rest from './rest';
import './App.scss';
import { validateData, getDepartureTimeAfterNow, getAvailableSeats, getTravelTimes } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date: moment().format('YYYY-MM-DD'),
      originStation: '0990',
      destinationStation: '1040',
      availableSeats: [],
      updateTime: '',
      times: [],
      prices: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.submit();
  }

  handleInputChange(event) {
    const {
      target: {
        type, name, checked, value,
      },
    } = event;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  submit() {
    const { originStation, destinationStation } = this.state;
    const { dispatch } = this.props;
    Promise.all([
      dispatch(rest.actions.stations()),
      dispatch(rest.actions.availableSeats({ stationId: originStation })),
      dispatch(rest.actions.prices({ originStationId: originStation, destinationStationID: destinationStation })),
      dispatch(rest.actions.times({ originStationId: originStation, destinationStationID: destinationStation, date: moment().format('YYYY-MM-DD') })),
    ]).then(() => {
      const { availableSeats, times, prices } = this.props;
      const validatedSeats = validateData(availableSeats);
      const validatedTimes = validateData(times);
      const validatedPrices = validateData(prices);
      let finalState = {};
      if (validatedSeats[0] && validatedSeats[0].availableSeats && validatedSeats[0].availableSeats.length) {
        const { updateTime, availableSeats } = validatedSeats[0];
        finalState = { updateTime, availableSeats };
      }
      if (validatedTimes) {
        finalState = { ...finalState, times: validatedTimes };
      }
      if (validatedPrices) {
        finalState = { ...finalState, prices: validatedPrices };
      }
      this.setState(finalState);
    });
  }

  render() {
    const { stations } = this.props;
    const {
      date,
      originStation,
      destinationStation,
      updateTime,
      availableSeats,
      times,
      prices,
    } = this.state;
    const validatedStations = validateData(stations);
    let optionOriginStations = [];
    let optionDestinationStations = [];
    let blockTableRows = <tr><td colSpan="6" style={{ textAlign: 'center' }}>無座位可販售</td></tr>;
    if (validatedStations) {
      validatedStations.forEach((station) => {
        optionOriginStations.push(
          <option key={`originStation${station.stationID}`} value={station.stationID}>
            {station.stationName.zhTw}
          </option>);
        optionDestinationStations.push(
          <option key={`destinationStation${station.stationID}`} value={station.stationID}>
            {station.stationName.zhTw}
          </option>);
      });
    }
    if (availableSeats && availableSeats.length) {
      // TODO: 先過濾資料，升序降序
      let finalData = availableSeats;
      finalData = getDepartureTimeAfterNow(date, finalData);
      finalData = getAvailableSeats(destinationStation, finalData);
      if (times && times.length) {
        finalData = getTravelTimes(date, times, finalData);
      }
      blockTableRows = finalData.map((availableSeat) => {
        const {
          departureTime,
          stationName,
          destinationStationName,
          arrivalTime,
          hasStandardSeat,
          travelTime,
        } = availableSeat;
        let price;
        if (prices) {
          if (hasStandardSeat) {
            price = prices[0].fares[0].price;
          } else {
            price = `商務車廂 ${prices[0].fares[1].price}`;
          }
        }
        return (
          <tr key={departureTime}>
            <td>{stationName.zhTw}</td>
            <td>{departureTime}</td>
            <td>{destinationStationName}</td>
            <td>{arrivalTime}</td>
            <td>{travelTime}</td>
            <td>{price}</td>
          </tr>);
      });
    }

    return (
      <div className="App">
        <input name="date" type="date" value={date} onChange={this.handleInputChange} />
        <select name="originStation" value={originStation} onChange={this.handleInputChange}>
          {optionOriginStations}
        </select>
        <select name="destinationStation" value={destinationStation} onChange={this.handleInputChange}>
          {optionDestinationStations}
        </select>
        <button type="button" onClick={this.submit}>送出</button>
        <br />
        <span>{moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>起站名稱</th>
                <th className="active">
                  <span>起站發車時間</span>
                  <span className="arrow arrow--asc" />
                </th>
                <th>訖站名稱</th>
                <th>訖站到達時間</th>
                <th className="active">
                  <span>總共乘車時間</span>
                  <span className="arrow arrow--asc" />
                </th>
                <th>票價</th>
              </tr>
            </thead>
            <tbody>
              {blockTableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  stations: state.stations,
  availableSeats: state.availableSeats,
  times: state.times,
  prices: state.prices,
});

export default connect(mapStateToProps)(App);
