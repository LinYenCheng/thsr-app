import { camelizeKeys } from 'humps';

import { ITime, TrainInfo } from '../types/times';
import { getTravelTime } from '../utils/util';
import { useLocalCache } from './useLocalCache';

interface Props {
  originStation: string;
  destinationStation: string;
  date: string;
}


function useTimes({ originStation, destinationStation, date }: Props) {
  const { data, isLoading } = useLocalCache<ITime[]>(
    originStation && destinationStation
      ? `/DailyTimetable/OD/${originStation}/to/${destinationStation}/${date}`
      : null,
  );

  if (data && data?.length) {
    window.scrollTo(0, 0);
    const camelizedData = camelizeKeys(data) as ITime[];
    const finalData: TrainInfo[] = camelizedData
      .filter((item) => {
        const timeString = `${item.trainDate} ${item?.originStopTime?.departureTime}`;
        const currentTrainDepartureTime = new Date(timeString).getTime();
        return currentTrainDepartureTime > Date.now();
      })
      .map((time) => {
        const { originStopTime, destinationStopTime, trainDate } = time;
        let arrivalTime;
        let destinationStationName;
        let travelTime;
        if (camelizedData && camelizedData.length) {
          arrivalTime = destinationStopTime.arrivalTime;
          destinationStationName = destinationStopTime.stationName.zhTw;
        }

        if (originStopTime.departureTime && destinationStopTime.arrivalTime) {
          travelTime = getTravelTime({
            date: trainDate,
            start: originStopTime.departureTime,
            end: destinationStopTime.arrivalTime,
          });
        }
        return {
          stationName: originStopTime.stationName.zhTw,
          destinationStationName,
          arrivalTime,
          departureTime: originStopTime.departureTime,
          travelTime,
          ...time,
        };
      });

    return {
      isLoading,
      updateTime: data ? (data[0] as any)?.UpdateTime : '',
      times: finalData,
    };
  }

  return {
    isLoading,
    updateTime: '',
    times: [],
  };
}

export default useTimes;
