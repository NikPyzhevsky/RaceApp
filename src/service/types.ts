export type DriverItemT = {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type RaceItemT = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
};

export type FetchDriversResponseT = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: {Drivers: DriverItemT[]};
  };
};

export type FetchRacesResponseT = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      driverId: string;
      Races: RaceItemT[];
    };
  };
};

export type DriversListT =
  FetchDriversResponseT['MRData']['DriverTable']['Drivers'];

export type RacesListT = FetchRacesResponseT['MRData']['RaceTable']['Races'];

export type FetchDriversParamsT = {
  limit: number;
  offset: number;
};

export type FetchDriversServiceT = (
  args: FetchDriversParamsT,
) => Promise<FetchDriversResponseT['MRData']>;

export type FetchDriverRacesByIdParamsT = FetchDriversParamsT & {
  id: string;
};

export type FetchRacesByDriverIdServiceT = (
  args: FetchDriverRacesByIdParamsT,
) => Promise<FetchRacesResponseT['MRData']>;
