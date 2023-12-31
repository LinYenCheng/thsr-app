import { SWRConfig, SWRConfiguration } from 'swr';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import App from './pages/App';

type Props = {};

interface CustomError extends Error {
  info?: any;
  status?: number;
}

const API_URL = 'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR';
const MySwal = withReactContent(Swal);

const fetcher = async (resource: string): Promise<any> => {
  const res = await fetch(`${API_URL}${resource}`);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: CustomError = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.

    error.info = await res.json();
    error.status = res.status;

    MySwal.fire({
      icon: 'info',
      title: error.info?.Message || '抱歉，伺服器維修中',
      showConfirmButton: false,
      showCloseButton: true,
    });

    throw error;
  }

  return res.json();
};

function localStorageProvider(): Map<string, any> {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map<string, any>(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

const swrConfig: SWRConfiguration = {
  provider: localStorageProvider,
  refreshInterval: 120 * 1000,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  fetcher,
} as any;

export default function Root({}: Props) {
  return (
    <SWRConfig value={swrConfig}>
      <App />
    </SWRConfig>
  );
}
