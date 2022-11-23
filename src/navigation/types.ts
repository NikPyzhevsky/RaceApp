import {RouteProp} from '@react-navigation/native';
import {DriverItemT} from '../service/types';

export enum ROUTES {
  DRIVER_LIST = 'DriverList',
  DRIVER_DETAILS = 'DriverDetails',
  RACES_LIST = 'RacesList',
}

export type RootStackParamList = {
  [ROUTES.DRIVER_LIST]: undefined;
  [ROUTES.DRIVER_DETAILS]: {driverDetails: DriverItemT};
  [ROUTES.RACES_LIST]: {driverId: DriverItemT['driverId']};
};

export type DriverDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  ROUTES.DRIVER_DETAILS
>;

export type RacesListScreenRouteProp = RouteProp<
  RootStackParamList,
  ROUTES.RACES_LIST
>;
