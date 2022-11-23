import {createSlice} from '@reduxjs/toolkit';
import {fetchDrivers} from './thunks';
import {DriversListT} from '../../service/types';
import {Alert} from 'react-native';

export type DriversListState = {
  drivers: DriversListT;
  loading: boolean;
  total?: number;
  page: number;
};

const initialState: DriversListState = {
  drivers: [],
  page: 0,
  loading: false,
};

export const driversListSlice = createSlice({
  name: 'driversList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDrivers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.loading = false;
      state.page += 1;
      state.drivers.push(...action.payload.drivers);
      state.total = Number(action.payload.total);
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.loading = false;
      Alert.alert('Something go wrong', action?.payload?.toString());
    });
  },
});

export const driversListReducer = driversListSlice.reducer;
