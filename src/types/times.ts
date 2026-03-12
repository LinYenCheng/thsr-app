export interface StopTime {
  stopSequence: number;
  stationID: string;
  stationName: StationName;
  arrivalTime: string;
  departureTime: string;
}

export interface ITime {
  trainDate: string;
  dailyTrainInfo: DailyTrainInfo;
  originStopTime: StopTime;
  destinationStopTime: StopTime;
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

export interface TrainInfo extends ITime {
  stationName: string;
  destinationStationName?: string;
  arrivalTime?: string;
  departureTime: string;
  travelTime?: string;
}

export interface Note {}

export interface StationName {
  zhTw: string;
  en: string;
}
