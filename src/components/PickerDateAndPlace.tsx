/* eslint-disable jsx-a11y/label-has-associated-control */
import 'date-input-polyfill';

import ConditionalRenderer from './ConditionalRenderer';

interface IStation {
  stationUID: string;
  stationID: string;
  stationCode: string;
  stationName: StationName;
  stationAddress: string;
  operatorID: string;
  updateTime: string;
  versionID: number;
  stationPosition: StationPosition;
  locationCity: string;
  locationCityCode: string;
  locationTown: string;
  locationTownCode: string;
}

interface StationPosition {
  positionLon: number;
  positionLat: number;
  geoHash: string;
}

interface StationName {
  zhTw: string;
  en: string;
}

interface Props {
  isMobile: boolean;
  date: string;
  stations: IStation[];
  originStation: string;
  destinationStation: string;
  swapLocation: () => void;
  handleInputChange: (event: any) => void;
}

function PickerDateAndPlace({
  isMobile,
  date,
  stations = [],
  originStation = '1030',
  destinationStation = '1060',
  handleInputChange,
  swapLocation
}: Props) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 8);

  return (
    <div className="control">
      <div className="form-group">
        <label htmlFor="date" className="column-name">
          日期:
        </label>
        <input
          name="date"
          id="date"
          type="date"
          min={today.toLocaleDateString('sv')}
          max={maxDate.toLocaleDateString('sv')}
          value={date}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="originStation" className="column-name">
          起|終點:
        </label>
        <select
          name="originStation"
          id="originStation"
          value={originStation}
          onChange={handleInputChange}
        >
          <option disabled value="">
            起點
          </option>
          {stations.map((station) => (
            <option key={`originStation${station.stationID}`} value={station.stationID}>
              {station.stationName.zhTw}
            </option>
          ))}
        </select>
        <button id="swapLocation" type="button" className="control__swap" onClick={swapLocation}>
          <span>⇆</span>
        </button>
        <select
          name="destinationStation"
          id="destinationStation"
          value={destinationStation}
          onChange={handleInputChange}
        >
          <option disabled value="">
            終點
          </option>
          {stations.map((station) => (
            <option key={`destinationStation${station.stationID}`} value={station.stationID}>
              {station.stationName.zhTw}
            </option>
          ))}
        </select>
      </div>

      <div className="space-between">
        <a href="https://irs.thsrc.com.tw/IMINT/?locale=tw" target="_blank" rel="noreferrer">
          <span>🔗</span>
          <span>訂票連結</span>
        </a>

        <ConditionalRenderer isShowContent={isMobile}>
          <a href="https://appurl.io/cLHMAafm1q" target="_blank" rel="noreferrer">
            <span>📲</span>
            <span>高鐵 App</span>
          </a>
        </ConditionalRenderer>
      </div>
      <ConditionalRenderer isShowContent={!isMobile}>
        <br />
        <div className="google-ad mobile--hide">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-format="fluid"
            data-ad-layout-key="-h4+1+1q-1t-2x"
            data-ad-client="ca-pub-1297466993744883"
            data-ad-slot="6263096726"
          />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

export default PickerDateAndPlace;
