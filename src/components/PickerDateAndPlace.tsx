import moment from 'moment';
import Swal from 'sweetalert2';
import 'date-input-polyfill';

import srcGift from './assets/gift.jpg';
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

type Props = {
  isMobile: boolean;
  date: string;
  stations: IStation[];
  originStation: string;
  destinationStation: string;
  swapLocation: () => void;
  handleInputChange: (event: React.ChangeEvent) => void;
};

function PickerDateAndPlace({
  isMobile,
  date,
  stations = [],
  originStation = '1030',
  destinationStation = '1060',
  handleInputChange,
  swapLocation
}: Props) {
  const openGift = () => {
    if (window.innerWidth > 500) {
      Swal.fire({
        title: '喜歡這個網站，贊助前端三分鐘',
        imageUrl: srcGift,
        showConfirmButton: false,
        imageAlt: '感謝您贊助前端三分鐘',
        showCancelButton: true,
        cancelButtonText: '關閉'
      });
    } else {
      Swal.fire({
        title: '<strong>如果喜歡這個網站，點擊下方連結贊助前端三分鐘，感謝您!</strong>',
        icon: 'success',
        html: '<a style="font-size: 2rem;" href="https://www.jkopay.com/transfer?j=Transfer:901546234">街口支付贊助連結</a> ',
        focusConfirm: false,
        confirmButtonColor: '#dd5500',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> 謝謝您!',
        confirmButtonAriaLabel: 'Thumbs up, great!'
      });
    }
  };

  return (
    <div className="control">
      <div className="form-group">
        <span className="column-name">日期:</span>
        <input
          name="date"
          id="date"
          type="date"
          min={moment().format('YYYY-MM-DD')}
          max={moment().add(8, 'month').format('YYYY-MM-DD')}
          value={date}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <span className="column-name">起|終點:</span>
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
          <span className="glyphicon glyphicon-transfer" />
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
          <span className="glyphicon glyphicon-link" />
          <span>訂票連結</span>
        </a>

        <ConditionalRenderer isShowContent={isMobile}>
          <a href="https://appurl.io/cLHMAafm1q" target="_blank" rel="noreferrer">
            <span className="glyphicon glyphicon-phone" />
            <span>高鐵 App</span>
          </a>
        </ConditionalRenderer>
      </div>

      <ConditionalRenderer isShowContent={!isMobile}>
        <hr />
        <div className="text-center">
          <button type="button" className="button-gift" onClick={openGift}>
            <span className="glyphicon glyphicon-gift" />
            <span> 喜歡這個網站 </span>
          </button>
        </div>
      </ConditionalRenderer>
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
