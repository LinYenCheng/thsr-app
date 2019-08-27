import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'date-input-polyfill';

function PickerDateAndPlace({
  date,
  stations,
  originStation,
  destinationStation,
  handleInputChange,
  swapLocation,
}) {
  const optionOriginStations = [];
  const optionDestinationStations = [];
  if (stations) {
    stations.forEach(station => {
      optionOriginStations.push(
        <option key={`originStation${station.stationID}`} value={station.stationID}>
          {station.stationName.zhTw}
        </option>,
      );
      optionDestinationStations.push(
        <option key={`destinationStation${station.stationID}`} value={station.stationID}>
          {station.stationName.zhTw}
        </option>,
      );
    });
  }
  return (
    <div className="control">
      <div className="form-group">
        <span>日期:</span>
        <input
          name="date"
          id="date"
          type="date"
          min={moment().format('YYYY-MM-DD')}
          max={moment()
            .add(8, 'month')
            .format('YYYY-MM-DD')}
          value={date}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <span>起點:</span>
        <select
          name="originStation"
          id="originStation"
          value={originStation}
          onChange={handleInputChange}
        >
          {optionOriginStations}
        </select>
      </div>
      <div className="form-group">
        <button id="swapLocation" type="button" className="control__swap" onClick={swapLocation}>
          <span className="glyphicon glyphicon-sort" />
        </button>
      </div>
      <div className="form-group">
        <span>終點:</span>
        <select
          name="destinationStation"
          id="destinationStation"
          value={destinationStation}
          onChange={handleInputChange}
        >
          {optionDestinationStations}
        </select>
      </div>
    </div>
  );
}

PickerDateAndPlace.propTypes = {
  originStation: PropTypes.string,
  destinationStation: PropTypes.string,
};

PickerDateAndPlace.defaultProps = {
  originStation: '1030',
  destinationStation: '1060',
};

export default PickerDateAndPlace;
