import React, { Component } from 'react';
import { connect } from 'react-redux';
import rest from './rest';
import './App.scss';
import { validateData } from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      originStation: '0990',
      destinationStation: '1040',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    Promise.all([
      dispatch(rest.actions.availableSeats({ stationId: '0990' })),
      dispatch(rest.actions.stations()),
      dispatch(rest.actions.prices({ originStationId: '0990', destinationStationID: '1040' })),
      dispatch(rest.actions.times({ originStationId: '0990', destinationStationID: '1040', date: '2018-11-18' })),
    ]);
  }
  render() {
    const { stations } = this.props;
    const { originStation, destinationStation } = this.state;
    const validatedStations = validateData(stations);
    let optionOriginStations = [];
    let optionDestinationStations = [];
    if (validatedStations) {
      validatedStations.forEach(station => {
        optionOriginStations.push(
          <option key={`originStation${station.stationID}`} value={station.stationID}>
            {station.stationName.zhTw}
          </option>
        );
        optionDestinationStations.push(
          <option key={`destinationStation${station.stationID}`} value={station.stationID}>
            {station.stationName.zhTw}
          </option>
        );
      })
    }
    return (
      <div className="App">
        <select name="originStation" value={originStation} onChange={this.handleInputChange}>
          {optionOriginStations}
        </select>
        <select name="destinationStation" value={destinationStation} onChange={this.handleInputChange}>
          {optionDestinationStations}
        </select>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>起站名稱</th>
                <th>起站發車時間</th>
                <th>訖站名稱</th>
                <th>訖站到達時間</th>
                <th>總共乘車時間</th>
                <th>票價</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>目前無紀錄</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    stations: state.stations,
    availableSeats: state.availableSeats,
  };
};

export default connect(mapStateToProps)(App);
