import React from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DriverDetailsScreenRouteProp} from '../../navigation/types';

export const DriverDetailsScreen = () => {
  const {
    params: {driverDetails},
  } = useRoute<DriverDetailsScreenRouteProp>();
  const {driverId, url, dateOfBirth, familyName, givenName, nationality} =
    driverDetails;

  const pressHandler = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text children={`name: ${givenName}`} style={styles.text} />
      <Text children={`driver id: ${driverId}`} style={styles.text} />
      <Text children={`date of birth: ${dateOfBirth}`} style={styles.text} />
      <Text children={`familyName: ${familyName}`} style={styles.text} />
      <Text children={`nationality: ${nationality}`} style={styles.text} />
      <Button title={'Open wiki'} onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
