import React, {FC} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

interface DriverCardProps {
  name: string;
  dateOfBirth: string;
  onPressContainer: () => void;
  onPressButton: () => void;
}

export const DriverCard: FC<DriverCardProps> = props => {
  const {name, dateOfBirth, onPressContainer, onPressButton} = props;
  return (
    <Pressable onPress={onPressContainer} style={styles.container}>
      <View>
        <Text children={name} style={styles.title} />
        <Text children={dateOfBirth} style={styles.subTitle} />
      </View>
      <Button title={'Races'} onPress={onPressButton} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
  },
  title: {
    color: 'black',
  },
});
