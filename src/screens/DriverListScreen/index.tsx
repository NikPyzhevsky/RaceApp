import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {RootState} from '../../store/store';
import {fetchDrivers} from '../../features/drivers-list';
import {DriverCard} from '../../components/DriverCard';
import {PAGE_LIMIT} from '../../constants/driversList';
import {styles} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, ROUTES} from '../../navigation/types';
import {DriverItemT} from '../../service/types';

export const DriverListScreen = () => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const {drivers, loading, page, total} = useAppSelector(
    (state: RootState) => state.driversList,
  );

  useEffect(() => {
    dispatch(fetchDrivers({limit: PAGE_LIMIT, offset: 0}));
  }, [dispatch]);

  const loadItems = () => {
    if (total && total > PAGE_LIMIT * page) {
      dispatch(fetchDrivers({limit: PAGE_LIMIT, offset: PAGE_LIMIT * page}));
    }
  };

  const cardPressHandler = (driverDetails: DriverItemT) => {
    navigate(ROUTES.DRIVER_DETAILS, {driverDetails});
  };

  const cardButtonPressHandler = (driverId: DriverItemT['driverId']) => {
    navigate(ROUTES.RACES_LIST, {driverId});
  };

  return (
    <FlatList
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text>Empty</Text>
        </View>
      }
      ListFooterComponent={loading ? <ActivityIndicator /> : undefined}
      data={drivers}
      onEndReached={loadItems}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => (
        <DriverCard
          onPressContainer={() => cardPressHandler(item)}
          name={item.givenName}
          dateOfBirth={item.dateOfBirth}
          onPressButton={() => cardButtonPressHandler(item.driverId)}
        />
      )}
    />
  );
};
