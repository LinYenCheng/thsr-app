import useSWR from 'swr';
import { camelizeKeys } from 'humps';

function useTimes({ originStation, destinationStation, date }) {
  const { data, error, isLoading } = useSWR(
    `/DailyTimetable/OD/${originStation}/to/${destinationStation}/${date}`,
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
