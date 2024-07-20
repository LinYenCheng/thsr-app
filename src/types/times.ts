export interface ITime {
  trainDate: string;
  dailyTrainInfo: DailyTrainInfo;
  originStopTime: OriginStopTime;
  destinationStopTime: DestinationStopTime;
  updateTime: string;
  versionID: number;
}

export interface DailyTrainInfo {
  trainNo: string;
  direction: number;
  startingStationID: string;
  startingStationName: StationName;
  endingStationID: string;
  endingStationName: StationName;
  note: Note;
}

export interface Note {}

export interface StationName {
  zhTw: string;
  en: string;
}

export interface OriginStopTime {
  stopSequence: number;
  stationID: string;
  stationName: StationName;
  arrivalTime: string;
  departureTime: string;
}

export interface DestinationStopTime {
  stopSequence: number;
  stationID: string;
  stationName: StationName;
  arrivalTime: string;
  departureTime: string;
}
