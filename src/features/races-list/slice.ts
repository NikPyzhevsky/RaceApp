import {createSlice} from '@reduxjs/toolkit';
import {fetchRacesByDriverID} from './thunks';
import {RacesListT} from '../../service/types';
import {Alert} from 'react-native';

export type RacesListState = {
  races: RacesListT;
  loading: boolean;
  total?: number;
  page: number;
};

const initialState: RacesListState = {
  races: [],
  page: 0,
  loading: false,
};

export const racesListSlice = createSlice({
  name: 'racesList',
  initialState,
  reducers: {
    clearAll: state => {
      state.loading = initialState.loading;
      state.page = initialState.page;
      state.total = initialState.total;
      state.races = initialState.races;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRacesByDriverID.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRacesByDriverID.fulfilled, (state, action) => {
      state.loading = false;
      state.page += 1;
      state.races.push(...action.payload.races);
      state.total = Number(action.payload.total);
    });
    builder.addCase(fetchRacesByDriverID.rejected, (state, action) => {
      state.loading = false;
      Alert.alert('Something go wrong', action?.payload?.toString());
    });
  },
});

export const racesListReducer = racesListSlice.reducer;
export const {clearAll} = racesListSlice.actions;
