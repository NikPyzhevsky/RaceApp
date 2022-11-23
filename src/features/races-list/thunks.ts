import {createAsyncThunk} from '@reduxjs/toolkit';
import {requests} from '../../service/requests';
import {RootState} from '../../store/store';
import {
  FetchDriverRacesByIdParamsT,
  FetchRacesResponseT,
  RacesListT,
} from '../../service/types';

export const fetchRacesByDriverID = createAsyncThunk<
  {races: RacesListT; total: FetchRacesResponseT['MRData']['total']},
  FetchDriverRacesByIdParamsT,
  {
    state: RootState;
  }
>('races/fetchRacesByDriverId', async (args, thunkAPI) => {
  try {
    const response = await requests.fetchDriverRacesByID(args);

    return {
      races: response.RaceTable.Races,
      total: response.total,
    };
  } catch (error) {
    const message = error?.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
