import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';

import PickerDateAndPlace from '../components/PickerDateAndPlace';
import RailTable from '../components/RailTable';

import useTimes from '../hooks/useTimes';
import useStations from '../hooks/useStations';
import ConditionalRenderer from '../components/ConditionalRenderer';

import '../styles/App.scss';

const MySwal = withReactContent(Swal);

function App() {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [originStation, setOriginStation] = useState(localStorage.getItem('originStation') || '');
  const [destinationStation, setDestinationStation] = useState(
    localStorage.getItem('destinationStation') || '',
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { stations } = useStations();
  const { updateTime, times, isLoading } = useTimes({
    originStation,
    destinationStation,
    date,
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  console.log(isMobile);

  const handleInputChange = (event) => {
    const { type, name, checked, value } = event.target;
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

  useEffect(() => {
    setOriginStation(localStorage.getItem('originStation') || stations[4].stationID);
    setDestinationStation(localStorage.getItem('destinationStation') || stations[10].stationID);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="row content--mobile">
          <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12 sticky mobile--hide">
            <PickerDateAndPlace
              date={date}
              stations={stations}
              originStation={originStation}
              destinationStation={destinationStation}
              handleInputChange={handleInputChange}
              swapLocation={swapLocation}
            />
            <br />
            <ConditionalRenderer isShowContent={!isMobile}>
              <div className="google-ad">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-1297466993744883"
                  data-ad-slot="9012117796"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </ConditionalRenderer>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-6 col-xs-12">
            <h3 id="title">高鐵班次時刻表快速查詢</h3>
            <RailTable
              isLoading={isLoading}
              date={date}
              times={times}
              destinationStation={destinationStation}
            />
            <ConditionalRenderer isShowContent={isMobile}>
              <div style={{ width: '100%', height: '350px' }}></div>
            </ConditionalRenderer>
            <ConditionalRenderer isShowContent={!isMobile}>
              <div className="google-ad mobile--hide">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-1297466993744883"
                  data-ad-slot="9012117796"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </ConditionalRenderer>
          </div>
        </div>
        <ConditionalRenderer isShowContent={isMobile}>
          {/* <div className="google-ad" style={{ width: '100%', height: '350px' }}>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-1297466993744883"
              data-ad-slot="9012117796"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div> */}
        </ConditionalRenderer>
        <div className="position-fixed desktop--hide">
          <PickerDateAndPlace
            isMobile={isMobile}
            date={date}
            stations={stations}
            originStation={originStation}
            destinationStation={destinationStation}
            handleInputChange={handleInputChange}
            swapLocation={swapLocation}
          />
        </div>
      </div>
      <div className="container-fluid footer">
        <div className="row">
          <div className="col-md-12 center footer">
            <i className="glyphicon glyphicon-time" />
            <span> {`更新時間：${moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}`}</span>
            <br />
            <span>
              <span>Copyright © </span>
              <a href="https://linyencheng.github.io/" target="_blank" rel="noreferrer">
                前端三分鐘
              </a>
              <span> 2023</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

App.propTypes = {
  // stations: PropTypes.array,
};

export default App;
