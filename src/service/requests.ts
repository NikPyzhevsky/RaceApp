import {AxiosResponse} from 'axios';
import {api} from './api';
import {FetchRacesByDriverIdServiceT, FetchDriversServiceT} from './types';

const fetchDrivers: FetchDriversServiceT = async ({limit = 20, offset = 0}) => {
  const response: AxiosResponse = await api.get(
    `/drivers.json?offset=${offset}&limit=${limit}`,
  );

  return response.data.MRData;
};

const fetchDriverRacesByID: FetchRacesByDriverIdServiceT = async ({
  id,
  offset,
  limit,
}) => {
  const response: AxiosResponse = await api.get(
    `/drivers/${id}/races.json?offset=${offset}&limit=${limit}`,
  );

  return response.data.MRData;
};

export const requests = {
  fetchDrivers,
  fetchDriverRacesByID,
};
