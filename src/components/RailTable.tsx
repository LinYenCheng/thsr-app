import { useState } from 'react';

import { sortByField } from '../utils/util';
import { ITime } from '../types/times';

type Props = {
  times: ITime[];
  isLoading: boolean;
};

const DEPARTURE_TIME = 'departureTime';
const TRAVEL_TIME = 'travelTime';
const ARRIVAL_TIME = 'arrivalTime';

function RailTable({ times, isLoading = true }: Props) {
  const [sortActiveColumn, setSortActiveColumn] = useState(DEPARTURE_TIME);
  const [departureTimeDSC, setDepartureTimeDSC] = useState(true);
  const [arrivalTimeDSC, setArrivalTimeDSC] = useState(true);
  const [travelTimeDSC, setTravelTimeDSC] = useState(true);

  const toggleSortDepartureTime = () => {
    setDepartureTimeDSC(!departureTimeDSC);
    setSortActiveColumn(DEPARTURE_TIME);
  };
  const toggleSortTravelTime = () => {
    setTravelTimeDSC(!travelTimeDSC);
    setSortActiveColumn(TRAVEL_TIME);
  };
  const toggleSortArrivalTime = () => {
    setArrivalTimeDSC(!arrivalTimeDSC);
    setSortActiveColumn(ARRIVAL_TIME);
  };

  let blockTableRows;
  if (isLoading) {
    blockTableRows = (
      <tr id="row-searching">
        <td colSpan={6} style={{ textAlign: 'center' }}>
          查詢中
        </td>
      </tr>
    );
  } else if (!isLoading) {
    blockTableRows = (
      <tr id="row-nodata">
        <td colSpan={6} style={{ textAlign: 'center' }}>
          無座位可販售
        </td>
      </tr>
    );
  } else {
    blockTableRows = (
      <tr>
        <td colSpan={6} style={{ textAlign: 'center' }}>
          條件已變更請重新送出查詢
        </td>
      </tr>
    );
  }

  if (!isLoading && times.length) {
    // 先過濾資料，升序降序
    let finalData = [...times];

    finalData = sortByField({
      data: finalData,
      field: TRAVEL_TIME,
      enableSort: sortActiveColumn === TRAVEL_TIME,
      direction: travelTimeDSC ? 1 : -1
    });
    finalData = sortByField({
      data: finalData,
      field: DEPARTURE_TIME,
      enableSort: sortActiveColumn === DEPARTURE_TIME,
      direction: departureTimeDSC ? 1 : -1
    });
    finalData = sortByField({
      data: finalData,
      field: ARRIVAL_TIME,
      enableSort: sortActiveColumn === ARRIVAL_TIME,
      direction: arrivalTimeDSC ? 1 : -1
    });

    blockTableRows = finalData.map(
      ({
        dailyTrainInfo,
        departureTime,
        stationName,
        destinationStationName,
        arrivalTime,
        travelTime
      }) => (
        <tr key={departureTime}>
          <td>{`${stationName}➔${destinationStationName}`}</td>
          <td>{dailyTrainInfo.trainNo}</td>
          <td>{departureTime}</td>
          <td>{arrivalTime}</td>
          <td>{travelTime}</td>
        </tr>
      )
    );
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

export default RailTable;
