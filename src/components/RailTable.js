import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  getItemsWithDepartureTimeAfterNow,
  getItemsWithTravelTimes,
  sortDepartureTime,
  sortArrivalTime,
  sortTravelTime,
} from '../util/util';

function RailTable({
  date,
  times,
  isLoading,
  isSubmit,
  // originStation,
}) {
  const [sortActiveMode, setSortActiveMode] = useState(0);
  const [departureTimeDSC, setDepartureTimeDSC] = useState(true);
  const [arrivalTimeDSC, setArrivalTimeDSC] = useState(true);
  const [travelTimeDSC, setTravelTimeDSC] = useState(true);

  const toggleSortDepartureTime = () => {
    setDepartureTimeDSC(!departureTimeDSC);
    setSortActiveMode(0);
  };
  const toggleSortTravelTime = () => {
    setTravelTimeDSC(!travelTimeDSC);
    setSortActiveMode(1);
  };
  const toggleSortArrivalTime = () => {
    setArrivalTimeDSC(!arrivalTimeDSC);
    setSortActiveMode(2);
  };

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

  if (!isLoading && isSubmit) {
    // 先過濾資料，升序降序
    let finalData = [...times];

    finalData = getItemsWithTravelTimes({
      date,
      finalData,
    });

    finalData = getItemsWithDepartureTimeAfterNow({
      date,
      finalData,
    });

    finalData = sortTravelTime({
      date,
      finalData,
      travelTimeDSC,
      active: sortActiveMode === 1,
    });

    finalData = sortDepartureTime({
      date,
      finalData,
      departureTimeDSC,
      active: sortActiveMode === 0,
    });

    finalData = sortArrivalTime({
      date,
      finalData,
      arrivalTimeDSC,
      active: sortActiveMode === 2,
    });

    blockTableRows = finalData.map((row) => {
      const {
        dailyTrainInfo,
        departureTime,
        stationName,
        destinationStationName,
        arrivalTime,
        travelTime,
      } = row;

      return (
        <tr key={departureTime}>
          <td>{`${stationName}|${destinationStationName}`}</td>
          <td>{dailyTrainInfo.trainNo}</td>
          <td>{departureTime}</td>
          <td>{arrivalTime}</td>
          <td>{travelTime}</td>
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
            <th>車次</th>
            <th id="departureTime" className="pointer" onClick={toggleSortDepartureTime}>
              <span>發車</span>
              <span className={departureTimeDSC ? 'arrow arrow--asc' : 'arrow arrow--dsc'} />
            </th>
            <th id="arrivalTime" className="pointer" onClick={toggleSortArrivalTime}>
              <span>到達</span>
              <span className={arrivalTimeDSC ? 'arrow arrow--dsc' : 'arrow arrow--asc'} />
            </th>
            <th id="travelTime" className="pointer" onClick={toggleSortTravelTime}>
              <span>總時間</span>
              <span className={travelTimeDSC ? 'arrow arrow--dsc' : 'arrow arrow--asc'} />
            </th>
          </tr>
        </thead>
        <tbody>{blockTableRows}</tbody>
      </table>
    </div>
  );
}

RailTable.propTypes = {
  isLoading: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

RailTable.defaultProps = {
  isLoading: true,
  isSubmit: true,
};

export default RailTable;
