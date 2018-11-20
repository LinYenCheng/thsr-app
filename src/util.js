

import moment from 'moment';

function validateData(reduxStatus) {
  // console.log(reduxStatus);
  if (reduxStatus && reduxStatus.data.status && reduxStatus.data.result) {
    return reduxStatus.data.result;
  }
  return 0;
}

function minutesOfDay(m) {
  return m.minutes() + m.hours() * 60;
}

function getDepartureTimeAfterNow(date, originalItems) {
  return originalItems
    .filter(item => minutesOfDay(moment(`${date} ${item.departureTime}`)) > minutesOfDay(moment()))
    .sort((a, b) => minutesOfDay(moment(`${date} ${a.departureTime}`)) - minutesOfDay(moment(`${date} ${b.departureTime}`)));
}

function getAvailableSeats(destinationStation, originalItems) {
  return originalItems.filter((item) => {
    const { stopStations } = item;
    const indexItem = stopStations.findIndex(stopStation => stopStation.stationID === destinationStation);
    if (indexItem > 0) {
      item.hasStandardSeat = stopStations[indexItem].standardSeatStatus !== 'Full';
      return stopStations[indexItem].standardSeatStatus !== 'Full' || stopStations[indexItem].businessSeatStatus !== 'Full';
    }
    return false;
  });
}

function getDestinationInfo(trainNo, times) {
  const nowInfo = times.filter(item => item.dailyTrainInfo.trainNo === trainNo);
  return nowInfo[0].destinationStopTime;
}

function getTravelTime(date, start, end) {
  const result = moment.utc(moment(`${date} ${end}`, 'YYYY-MM-DD HH:mm')
    .diff(moment(`${date} ${start}`, 'YYYY-MM-DD HH:mm:ss')))
    .format('HH:mm');
  return result;
}

function getTravelTimes(date, times, originalItems) {
  const finalItems = originalItems.map((availableSeat) => {
    const { departureTime, trainNo } = availableSeat;
    let destinationInfo = {};
    let arrivalTime;
    let destinationStationName;
    let travelTime;
    if (times && times.length) {
      destinationInfo = getDestinationInfo(trainNo, times);
      if (destinationInfo) {
        arrivalTime = destinationInfo.arrivalTime;
        destinationStationName = destinationInfo.stationName.zhTw;
      }
    }

    if (departureTime && arrivalTime) {
      travelTime = getTravelTime(date, departureTime, arrivalTime);
    }
    return {
      ...availableSeat,
      destinationStationName,
      arrivalTime,
      travelTime,
    };
  });

  return finalItems.sort((a, b) => minutesOfDay(moment(`${date} ${a.travelTime}`)) - minutesOfDay(moment(`${date} ${b.travelTime}`)));
}

export {
  validateData,
  getDepartureTimeAfterNow,
  getAvailableSeats,
  getDestinationInfo,
  getTravelTime,
  getTravelTimes,
}