import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DriverListScreen} from '../screens/DriverListScreen';
import {RootStackParamList, ROUTES} from './types';
import {DriverDetailsScreen} from '../screens/DriverDetailsScreen';
import {RacesListScreen} from '../screens/RacesListScreen';
import {DarkTheme} from './constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={ROUTES.DRIVER_LIST}>
        <Stack.Screen name={ROUTES.DRIVER_LIST} component={DriverListScreen} />
        <Stack.Screen
          name={ROUTES.DRIVER_DETAILS}
          component={DriverDetailsScreen}
        />
        <Stack.Screen name={ROUTES.RACES_LIST} component={RacesListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
