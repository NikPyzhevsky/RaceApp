import React, {useEffect} from 'react';
import {ActivityIndicator, FlatList, Linking, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {RootState} from '../../store/store';
import {PAGE_LIMIT} from '../../constantы/driversList';
import {styles} from './styles';
import {useRoute} from '@react-navigation/native';
import {RacesListScreenRouteProp} from '../../navigation/types';
import {fetchRacesByDriverID} from '../../features/races-list';
import {RaceCard} from '../../components/RacesCard';
import {RaceItemT} from '../../service/types';
import {clearAll} from '../../features/races-list/slice';

export const RacesListScreen = () => {
  const dispatch = useAppDispatch();
  const {
    params: {driverId},
  } = useRoute<RacesListScreenRouteProp>();

  const {races, loading, page, total} = useAppSelector(
    (state: RootState) => state.racesList,
  );

  useEffect(() => {
    dispatch(
      fetchRacesByDriverID({limit: PAGE_LIMIT, offset: 0, id: driverId}),
    );
    return function cleanup() {
      dispatch(clearAll());
    };
  }, [dispatch, driverId]);

  const loadItems = () => {
    if (total && total > PAGE_LIMIT * page) {
      dispatch(
        fetchRacesByDriverID({
          limit: PAGE_LIMIT,
          offset: PAGE_LIMIT * page,
          id: driverId,
        }),
      );
    }
  };

  const pressHandler = (url: RaceItemT['url']) => {
    Linking.openURL(url);
  };

  return (
    <FlatList
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text>Empty</Text>
        </View>
      }
      ListFooterComponent={loading ? <ActivityIndicator /> : undefined}
      data={races}
      onEndReached={loadItems}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => (
        <RaceCard
          onPressButton={() => pressHandler(item.url)}
          name={item.raceName}
          date={item.date}
        />
      )}
    />
  );
};
