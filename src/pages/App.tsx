import { useState } from 'preact/compat';
import useLocalStorageState from 'use-local-storage-state';

import PickerDateAndPlace from '../components/PickerDateAndPlace';
import RailTable from '../components/RailTable';

import useTimes from '../hooks/useTimes';
import useStations from '../hooks/useStations';
import ConditionalRenderer from '../components/ConditionalRenderer';

import '../styles/bootstrap.css';
import '../styles/App.scss';
import { MySwal } from '../context/MySwalContext';

function App() {
  const [date, setDate] = useState(new Date().toLocaleDateString('sv'));
  const [originStation, setOriginStation] = useLocalStorageState('originStation', {
    defaultValue: '',
  });
  const [destinationStation, setDestinationStation] = useLocalStorageState('destinationStation', {
    defaultValue: '',
  });
  const isMobile = window.innerWidth < 768;

  const { stations } = useStations();
  const { updateTime, times, isLoading } = useTimes({
    originStation,
    destinationStation,
    date,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target as HTMLInputElement;
    event.preventDefault();

    if (
      (name !== 'originStation' && name !== 'destinationStation') ||
      (name === 'originStation' && value !== destinationStation) ||
      (name === 'destinationStation' && value !== originStation)
    ) {
      if (name === 'date') {
        setDate(value);
      }
      if (name === 'originStation') {
        setOriginStation(value);
      }
      if (name === 'destinationStation') {
        setDestinationStation(value);
      }
    } else {
      MySwal.fire({
        icon: 'info',
        type: 'warn',
        timer: 5000,
        title: '起點和終點需不同',
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  const swapLocation = () => {
    setOriginStation(destinationStation);
    setDestinationStation(originStation);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <span className="brand-mark" aria-hidden="true">THSR</span>
          <div>
            <p className="eyebrow">TAIWAN HIGH SPEED RAIL</p>
            <h1 id="title">高鐵時刻表班次快速查詢</h1>
            <p className="header-copy">選好日期與區間，即時查看接下來可搭乘的班次。</p>
          </div>
        </div>
      </header>
      <main className="container app-main">
        <div className="row content--mobile">
          <aside className="col-lg-4 col-md-5 col-sm-6 col-xs-12 sticky">
            <PickerDateAndPlace
              isMobile={isMobile}
              date={date}
              stations={stations}
              originStation={originStation}
              destinationStation={destinationStation}
              handleInputChange={handleInputChange}
              swapLocation={swapLocation}
            />
            <ConditionalRenderer isShowContent={!isMobile}>
              <div className="google-ad">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-1297466993744883"
                  data-ad-slot="9012117796"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </ConditionalRenderer>
          </aside>
          <section
            className="col-lg-8 col-md-7 col-sm-6 col-xs-12 results-panel"
            aria-labelledby="results-heading"
          >
            <div className="results-heading">
              <div>
                <p className="eyebrow">DEPARTURES</p>
                <h2 id="results-heading">可搭乘班次</h2>
              </div>
              <span className="results-date">{date.replaceAll('-', '.')}</span>
            </div>
            <RailTable isLoading={isLoading} date={date} times={times} />
            <ConditionalRenderer isShowContent={!isMobile}>
              <div className="google-ad mobile--hide">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="autorelaxed"
                  data-ad-client="ca-pub-1297466993744883"
                  data-ad-slot="1800981579"
                  data-full-width-responsive="true"
                />
              </div>
            </ConditionalRenderer>
          </section>
        </div>
      </main>
      <div
        className="google-ad"
        style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-1297466993744883"
          data-ad-slot="1800981579"
        />
      </div>
      <footer className="container-fluid footer">
        <div className="row">
          <div className="col-md-12 center footer">
            <span>
              {updateTime &&
                `更新時間：${new Intl.DateTimeFormat('sv', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }).format(new Date(updateTime))}`}
            </span>
            <br />
            <span>
              <span>Copyright © </span>
              <a href="https://linyencheng.github.io/" target="_blank" rel="noreferrer">
                前端三分鐘
              </a>
              <span> 2026</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
