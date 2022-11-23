import React, {FC} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface RaceCardProps {
  name: string;
  date: string;
  onPressButton: () => void;
}

export const RaceCard: FC<RaceCardProps> = props => {
  const {name, date, onPressButton} = props;
  return (
    <View style={styles.container}>
      <View>
        <Text children={name} style={styles.title} />
        <Text children={date} style={styles.subTitle} />
      </View>
      <Button title={'Wiki'} onPress={onPressButton} />
    </View>
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
