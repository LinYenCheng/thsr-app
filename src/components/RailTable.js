import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getItemsWithDepartureTimeAfterNow,
  getItemsWithAvailableSeats,
  getItemsWithTravelTimes,
} from '../util/util';

class RailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortActiveMode: 0,
      departureTimeDSC: true,
      travelTimeDSC: true,
    };
    this.toggleSortDepartureTime = () => {
      const { departureTimeDSC } = this.state;
      this.setState({
        departureTimeDSC: !departureTimeDSC,
        sortActiveMode: 0,
      });
    };
    this.toggleSortTravelTime = () => {
      const { travelTimeDSC } = this.state;
      this.setState({
        travelTimeDSC: !travelTimeDSC,
        sortActiveMode: 1,
      });
    };
  }

  render() {
    const {
      date,
      times,
      prices,
      isLoading,
      isSubmit,
      // originStation,
      destinationStation,
      availableSeats,
    } = this.props;
    const { departureTimeDSC, travelTimeDSC, sortActiveMode } = this.state;
    let blockTableRows;
    if (isLoading && isSubmit) {
      blockTableRows = (
        <tr id="row-searching">
          <td colSpan="6" style={{ textAlign: 'center' }}>
            查詢中
          </td>
        </tr>
      );
    } else if (!isLoading && isSubmit) {
      blockTableRows = (
        <tr id="row-nodata">
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

    if (availableSeats && availableSeats.length && !isLoading && isSubmit) {
      // 先過濾資料，升序降序
      let finalData = availableSeats;
      finalData = getItemsWithDepartureTimeAfterNow({
        date,
        finalData,
        departureTimeDSC,
        active: sortActiveMode === 0,
      });
      // console.log(finalData);
      finalData = getItemsWithAvailableSeats(destinationStation, finalData);
      // console.log(destinationStation, finalData);
      finalData = getItemsWithTravelTimes({
        date,
        times,
        finalData,
        travelTimeDSC,
        active: sortActiveMode === 1,
      });

      blockTableRows = finalData.map(availableSeat => {
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
            price = prices[0].fares.map(fare => `${fare.ticketType}:${fare.price}`).toString();
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
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>起|終點</th>
              <th id="departureTime" className="pointer" onClick={this.toggleSortDepartureTime}>
                <span>發車</span>
                <span className={departureTimeDSC ? 'arrow arrow--asc' : 'arrow arrow--dsc'} />
              </th>
              <th>到達</th>
              <th id="travelTime" className="pointer" onClick={this.toggleSortTravelTime}>
                <span>總時間</span>
                <span className={travelTimeDSC ? 'arrow arrow--dsc' : 'arrow arrow--asc'} />
              </th>
              <th>票價</th>
            </tr>
          </thead>
          <tbody>{blockTableRows}</tbody>
        </table>
      </div>
    );
  }
}

RailTable.propTypes = {
  availableSeats: PropTypes.array,
  prices: PropTypes.array,
  isLoading: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

RailTable.defaultProps = {
  isLoading: true,
  isSubmit: true,
};

export default RailTable;
