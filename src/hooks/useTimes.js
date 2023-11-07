import useSWR from 'swr';
import { camelizeKeys } from 'humps';

function useTimes({ originStation, destinationStation, date }) {
  const { data, error, isLoading } = useSWR(
    originStation && destinationStation
      ? `/DailyTimetable/OD/${originStation}/to/${destinationStation}/${date}`
      : null,
  );

  if (data && data?.length) {
    return {
      isLoading,
      updateTime: data ? data[0]?.UpdateTime : '',
      times: camelizeKeys(data),
    };
  }

  return {
    isLoading,
    updateTime: '',
    times: [],
  };
}

export default useTimes;
