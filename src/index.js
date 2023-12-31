import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import Swal from 'sweetalert2';

import App from './pages/App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const API_URL = 'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR';

const fetcher = async (resource) => {
  const res = await fetch(`${API_URL}${resource}`);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.

    error.info = await res.json();
    error.status = res.status;

    Swal.fire({
      icon: 'info',
      type: 'error',
      title: error.info.Message || '抱歉，伺服器維修中',
      showConfirmButton: false,
      showCloseButton: true,
      onClose: () => {
        isModalOpen = false;
      },
    });

    throw error;
  }

  return res.json();
};

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

root.render(
  <SWRConfig
    value={{
      provider: localStorageProvider,
      refreshInterval: 120 * 1000,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fetcher,
    }}
  >
    <App />
  </SWRConfig>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
