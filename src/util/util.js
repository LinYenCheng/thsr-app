import moment from 'moment';

function minutesOfDay(m) {
  return m.minutes() + m.hours() * 60;
}

function getItemsWithDepartureTimeAfterNow(data) {
  const { date, finalData: originalItems, departureTimeDSC, active } = data;
  const finalItems = originalItems.filter(
    (item) => moment(`${date} ${item.originStopTime.departureTime}`).unix() > moment().unix(),
  );
  if (active) {
    if (departureTimeDSC) {
      return finalItems.sort(
        (a, b) =>
          minutesOfDay(moment(`${date} ${a.originStopTime.departureTime}`)) -
          minutesOfDay(moment(`${date} ${b.originStopTime.departureTime}`)),
      );
    }
    return finalItems.sort(
      (b, a) =>
        minutesOfDay(moment(`${date} ${a.originStopTime.departureTime}`)) -
        minutesOfDay(moment(`${date} ${b.originStopTime.departureTime}`)),
    );
  }
  return finalItems;
}

function getItemsWithAvailableSeats(destinationStation, originalItems) {
  return originalItems.filter((item) => {
    const { stopStations } = item;
    const indexItem = stopStations.findIndex(
      (stopStation) => stopStation.stationID === destinationStation,
    );
    if (indexItem >= 0) {
      item.hasStandardSeat = stopStations[indexItem].standardSeatStatus !== 'Full';
      return (
        stopStations[indexItem].standardSeatStatus !== 'Full' ||
        stopStations[indexItem].businessSeatStatus !== 'Full'
      );
    }
    return [];
  });
}

function getDestinationInfo(trainNo, times) {
  const nowInfo = times.filter((item) => item.dailyTrainInfo.trainNo === trainNo);
  if (nowInfo[0]) {
    return nowInfo[0].destinationStopTime;
  }
  return false;
}

function getTravelTime(date, start, end) {
  const result = moment
    .utc(
      moment(`${date} ${end}`, 'YYYY-MM-DD HH:mm').diff(
        moment(`${date} ${start}`, 'YYYY-MM-DD HH:mm:ss'),
      ),
    )
    .format('HH:mm');
  return result;
}

function getItemsWithTravelTimes(data) {
  const { date, times, travelTimeDSC, active } = data;
  const finalItems = times
    .map((time) => {
      const { originStopTime, destinationStopTime } = time;
      let arrivalTime;
      let destinationStationName;
      let travelTime;
      if (times && times.length) {
        arrivalTime = destinationStopTime.arrivalTime;
        destinationStationName = destinationStopTime.stationName.zhTw;
      }

      if (originStopTime.departureTime && destinationStopTime.arrivalTime) {
        travelTime = getTravelTime(
          date,
          originStopTime.departureTime,
          destinationStopTime.arrivalTime,
        );
      }
      return {
        stationName: originStopTime.stationName.zhTw,
        destinationStationName,
        arrivalTime,
        departureTime: originStopTime.departureTime,
        travelTime,
        ...time,
      };
    })
    .filter((item) => item.arrivalTime);
  if (active) {
    if (travelTimeDSC) {
      return finalItems.sort(
        (b, a) =>
          minutesOfDay(moment(`${date} ${a.travelTime}`)) -
          minutesOfDay(moment(`${date} ${b.travelTime}`)),
      );
    }
    return finalItems.sort(
      (a, b) =>
        minutesOfDay(moment(`${date} ${a.travelTime}`)) -
        minutesOfDay(moment(`${date} ${b.travelTime}`)),
    );
  }
  return finalItems;
}

export {
  getItemsWithDepartureTimeAfterNow,
  getItemsWithAvailableSeats,
  getDestinationInfo,
  getTravelTime,
  getItemsWithTravelTimes,
};
