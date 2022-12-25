import moment from 'moment';

function minutesOfDay(m) {
  return m.minutes() + m.hours() * 60;
}

function getItemsWithDepartureTimeAfterNow(data) {
  const { date, finalData: originalItems } = data;
  const finalItems = originalItems.filter(
    (item) => moment(`${date} ${item.originStopTime.departureTime}`).unix() > moment().unix(),
  );
  return finalItems;
}

function sortDepartureTime(data) {
  const { date, finalData: originalItems, departureTimeDSC, active } = data;
  if (active) {
    if (departureTimeDSC) {
      return originalItems.sort(
        (a, b) =>
          minutesOfDay(moment(`${date} ${a.originStopTime.departureTime}`)) -
          minutesOfDay(moment(`${date} ${b.originStopTime.departureTime}`)),
      );
    }
    return originalItems.sort(
      (b, a) =>
        minutesOfDay(moment(`${date} ${a.originStopTime.departureTime}`)) -
        minutesOfDay(moment(`${date} ${b.originStopTime.departureTime}`)),
    );
  }
  return originalItems;
}

function sortArrivalTime(data) {
  const { date, finalData: originalItems, arrivalTimeDSC, active } = data;
  if (active) {
    if (arrivalTimeDSC) {
      return originalItems.sort(
        (b, a) =>
          minutesOfDay(moment(`${date} ${a.destinationStopTime.arrivalTime}`)) -
          minutesOfDay(moment(`${date} ${b.destinationStopTime.arrivalTime}`)),
      );
    }
    return originalItems.sort(
      (a, b) =>
        minutesOfDay(moment(`${date} ${a.destinationStopTime.arrivalTime}`)) -
        minutesOfDay(moment(`${date} ${b.destinationStopTime.arrivalTime}`)),
    );
  }
  return originalItems;
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
  const { date, finalData } = data;
  const finalItems = finalData
    .map((time) => {
      const { originStopTime, destinationStopTime } = time;
      let arrivalTime;
      let destinationStationName;
      let travelTime;
      if (finalData && finalData.length) {
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

  return finalItems;
}

function sortTravelTime(data) {
  const { date, finalData, travelTimeDSC, active } = data;
  if (active) {
    if (travelTimeDSC) {
      return finalData.sort(
        (b, a) =>
          minutesOfDay(moment(`${date} ${a.travelTime}`)) -
          minutesOfDay(moment(`${date} ${b.travelTime}`)),
      );
    }
    return finalData.sort(
      (a, b) =>
        minutesOfDay(moment(`${date} ${a.travelTime}`)) -
        minutesOfDay(moment(`${date} ${b.travelTime}`)),
    );
  }
  return finalData;
}

export {
  getItemsWithDepartureTimeAfterNow,
  sortDepartureTime,
  sortArrivalTime,
  getDestinationInfo,
  getTravelTime,
  getItemsWithTravelTimes,
  sortTravelTime,
};
