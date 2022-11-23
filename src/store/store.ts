import {configureStore} from '@reduxjs/toolkit';
import {driversListReducer} from '../features/drivers-list';
import {racesListReducer} from '../features/races-list';

export const store = configureStore({
  reducer: {
    driversList: driversListReducer,
    racesList: racesListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
