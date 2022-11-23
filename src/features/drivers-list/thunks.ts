import {createAsyncThunk} from '@reduxjs/toolkit';
import {requests} from '../../service/requests';
import {RootState} from '../../store/store';
import {
  DriversListT,
  FetchDriversResponseT,
  FetchDriversParamsT,
} from '../../service/types';

export const fetchDrivers = createAsyncThunk<
  {drivers: DriversListT; total: FetchDriversResponseT['MRData']['total']},
  FetchDriversParamsT,
  {
    state: RootState;
  }
>('drivers/fetchDrivers', async (args, thunkAPI) => {
  try {
    const response = await requests.fetchDrivers(args);

    return {
      drivers: response.DriverTable.Drivers,
      total: response.total,
    };
  } catch (error) {
    const message = error?.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
