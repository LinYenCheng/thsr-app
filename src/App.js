import React, { Component } from 'react';
import 'date-input-polyfill';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import moment from 'moment';
import rest from './rest';
import './App.scss';
import {
  validateData,
  getItemsWithDepartureTimeAfterNow,
  getItemsWithAvailableSeats,
  getItemsWithTravelTimes
} from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSubmit: false,
      date: moment().format('YYYY-MM-DD'),
      originStation: '1030',
      destinationStation: '1060',
      availableSeats: [],
      updateTime: '',
      times: [],
      prices: [],
      sortActiveMode: 0,
      departureTimeDSC: true,
      travelTimeDSC: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleSortDepartureTime = () =>
      this.setState({
        departureTimeDSC: !this.state.departureTimeDSC,
        sortActiveMode: 0
      });
    this.toggleSortTravelTime = () =>
      this.setState({
        travelTimeDSC: !this.state.travelTimeDSC,
        sortActiveMode: 1
      });
    this.swapLocation = () =>
      this.setState(
        {
          originStation: this.state.destinationStation,
          destinationStation: this.state.originStation
        },
        this.submit
      );
  }

  componentDidMount() {
    this.submit();
  }

  handleInputChange(event) {
    const {
      target: { type, name, checked, value }
    } = event;
    event.preventDefault();
    if (name === 'originStation' || name === 'destinationStation') {
      if (name === 'originStation' && value !== this.state.destinationStation) {
        this.setState(
          {
            isSubmit: false,
            [name]: type === 'checkbox' ? checked : value
          },
          () => {
            this.submit();
          }
        );
      } else if (
        name === 'destinationStation' &&
        value !== this.state.originStation
      ) {
        this.setState(
          {
            isSubmit: false,
            [name]: type === 'checkbox' ? checked : value
          },
          () => {
            this.submit();
          }
        );
      } else {
        swal({
          type: 'info',
          timer: 1000,
          title: '起點和終點需不同',
          showConfirmButton: false,
          showCloseButton: true
        });
      }
    } else if (value) {
      this.setState(
        {
          isSubmit: false,
          [name]: type === 'checkbox' ? checked : value
        },
        () => {
          this.submit();
        }
      );
    }
  }

  submit() {
    const { originStation, destinationStation, date } = this.state;
    const { dispatch } = this.props;
    this.setState({ isLoading: true, isSubmit: true }, () => {
      Promise.all([
        dispatch(rest.actions.stations.sync()),
        dispatch(rest.actions.availableSeats({ stationId: originStation })),
        dispatch(
          rest.actions.prices({
            originStationId: originStation,
            destinationStationID: destinationStation
          })
        ),
        dispatch(
          rest.actions.times({
            originStationId: originStation,
            destinationStationID: destinationStation,
            date: date
          })
        )
      ]).then(() => {
        const { availableSeats, times, prices } = this.props;
        const validatedSeats = validateData(availableSeats);
        const validatedTimes = validateData(times);
        const validatedPrices = validateData(prices);
        let finalState = {};
        if (
          validatedSeats[0] &&
          validatedSeats[0].availableSeats &&
          validatedSeats[0].availableSeats.length
        ) {
          const { updateTime, availableSeats } = validatedSeats[0];
          finalState = { updateTime, availableSeats };
        }
        if (validatedTimes) {
          finalState = {
            ...finalState,
            times: validatedTimes,
            isLoading: false
          };
        }
        if (validatedPrices) {
          finalState = {
            ...finalState,
            prices: validatedPrices,
            isLoading: false
          };
        }
        this.setState(finalState);
      });
    });
  }

  render() {
    const { stations } = this.props;
    const {
      isLoading,
      isSubmit,
      date,
      originStation,
      destinationStation,
      updateTime,
      availableSeats,
      times,
      prices,
      departureTimeDSC,
      travelTimeDSC,
      sortActiveMode
    } = this.state;
    const validatedStations = validateData(stations);
    let optionOriginStations = [];
    let optionDestinationStations = [];
    let blockTableRows;
    if (isLoading && isSubmit) {
      blockTableRows = (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            查詢中
          </td>
        </tr>
      );
    } else if (!isLoading && isSubmit) {
      blockTableRows = (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            無座位可販售
          </td>
        </tr>
      );
    } else {
      blockTableRows = (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>
            條件已變更請重新送出查詢
          </td>
        </tr>
      );
    }
    if (validatedStations) {
      validatedStations.forEach(station => {
        optionOriginStations.push(
          <option
            key={`originStation${station.stationID}`}
            value={station.stationID}
          >
            {station.stationName.zhTw}
          </option>
        );
        optionDestinationStations.push(
          <option
            key={`destinationStation${station.stationID}`}
            value={station.stationID}
          >
            {station.stationName.zhTw}
          </option>
        );
      });
    }
    if (availableSeats && availableSeats.length && !isLoading && isSubmit) {
      // 先過濾資料，升序降序
      let finalData = availableSeats;
      finalData = getItemsWithDepartureTimeAfterNow({
        date,
        finalData,
        departureTimeDSC,
        active: sortActiveMode === 0
      });
      finalData = getItemsWithAvailableSeats(destinationStation, finalData);
      finalData = getItemsWithTravelTimes({
        date,
        times,
        finalData,
        travelTimeDSC,
        active: sortActiveMode === 1
      });
      if (finalData.length) {
        blockTableRows = finalData.map(availableSeat => {
          const {
            departureTime,
            stationName,
            destinationStationName,
            arrivalTime,
            hasStandardSeat,
            travelTime
          } = availableSeat;
          let price;
          if (prices) {
            if (hasStandardSeat) {
              price = prices[0].fares
                .map(fare => `${fare.ticketType}:${fare.price}`)
                .toString();
            } else {
              price = prices[0].fares
                .filter(fare => fare.ticketType !== '標準')
                .map(fare => `${fare.ticketType}:${fare.price}`)
                .toString();
            }
          }
          return (
            <tr key={departureTime}>
              <td>{`${stationName.zhTw}|${destinationStationName}`}</td>
              <td>{departureTime}</td>
              <td>{arrivalTime}</td>
              <td>{travelTime}</td>
              <td>{price}</td>
            </tr>
          );
        });
      }
    }

    const blockControl = (
      <div className="control">
        <div className="form-group">
          <label htmlFor="date">日期:</label>
          <input
            name="date"
            id="date"
            type="date"
            min={moment().format('YYYY-MM-DD')}
            max={moment()
              .add(8, 'month')
              .format('YYYY-MM-DD')}
            value={date}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="originStation">起點:</label>
          <select
            name="originStation"
            id="originStation"
            value={originStation}
            onChange={this.handleInputChange}
          >
            {optionOriginStations}
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="control__swap"
            onClick={this.swapLocation}
          >
            <span className="glyphicon glyphicon-sort" />
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="destinationStation">終點:</label>
          <select
            name="destinationStation"
            id="destinationStation"
            value={destinationStation}
            onChange={this.handleInputChange}
          >
            {optionDestinationStations}
          </select>
        </div>
      </div>
    );

    return (
      <>
        <div className="App container">
          <div className="sticky desktop--hide">{blockControl}</div>
          <div className="row content--mobile">
            <div className="col-md-8 col-sm-7 col-xs-12">
              <h2 id="App-title">高鐵查詢</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>起|終點</th>
                      <th
                        id="departureTime"
                        className="pointer"
                        onClick={this.toggleSortDepartureTime}
                      >
                        <span>發車</span>
                        <span
                          className={
                            departureTimeDSC
                              ? 'arrow arrow--asc'
                              : 'arrow arrow--dsc'
                          }
                        />
                      </th>
                      <th>到達</th>
                      <th
                        className="pointer"
                        onClick={this.toggleSortTravelTime}
                      >
                        <span>總時間</span>
                        <span
                          className={
                            travelTimeDSC
                              ? 'arrow arrow--dsc'
                              : 'arrow arrow--asc'
                          }
                        />
                      </th>
                      <th>票價</th>
                    </tr>
                  </thead>
                  <tbody>{blockTableRows}</tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 col-sm-5 col-xs-12 sticky mobile--hide">
              {blockControl}
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 center footer">
              <i className="glyphicon glyphicon-time" />
              <span>{` 更新時間:${moment(updateTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )}`}</span>
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
  availableSeats: state.availableSeats,
  times: state.times,
  prices: state.prices
});

export default connect(mapStateToProps)(App);
