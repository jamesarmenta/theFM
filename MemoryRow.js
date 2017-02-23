import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const dateFormat = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
}

const MemoryRow = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.data.imagePath}} style={{width: 10, height: 10,}} />
    <Text style={styles.text}>
      {new Date(parseInt(props.data.date)).toLocaleTimeString("en-us", dateFormat)}
      {'\n'}
      Viewed {props.data.viewed} times
    </Text>
  </View>
);

export default MemoryRow