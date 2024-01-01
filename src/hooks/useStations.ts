import useSWR from 'swr';
import { camelizeKeys } from 'humps';
import { CAMELIZE_STATIONS, IStation } from '../constants/stations';

interface IStationsResult {
  isLoading: boolean;
  stations: IStation[];
}

function useStations(): IStationsResult {
  const { data, error, isLoading } = useSWR(`/Station`);

  if (data && data?.length) {
    return {
      isLoading,
      stations: camelizeKeys(data) as IStation[],
    };
  }

  return {
    isLoading,
    stations: CAMELIZE_STATIONS,
  };
}

export default useStations;
