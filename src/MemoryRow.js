import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#B6B5B5'
  },
  creationDate: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    paddingRight: 0,
    fontSize: 24,
    fontFamily: 'DK Kusukusu',
    color: '#B6B5B5',
  },
  timesWrapper: {
    borderLeftWidth: 3, 
    borderColor: '#B6B5B5'
  },
  times: {
    width: 130, 
    alignSelf: 'center',
    padding: 16,
    fontSize: 24,
    fontFamily: 'DK Kusukusu',
    color: '#B6B5B5',
  },
});

const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }
  /*
  receives object 
  {
    date: epoch date in ms (string), 
    imagePage: path to image in app documents (string), 
    viewed: number of views (int)
  }
  */

const MemoryRow = (props) => (
  <TouchableWithoutFeedback onPress={()=>{props.data.viewed++;props.data.type = ActionConst.RESET; Actions.memoryView(props.data)}}>
  <View style={styles.container} >
      <Text style={{paddingLeft: 6, paddingTop: 6, color: '#B6B5B5'}}>{parseInt(props.rowID)+1}</Text>
      <Text style={styles.creationDate}>
        {new Date(parseInt(props.data.date)).toLocaleTimeString("en-us", dateFormat)}
      </Text>
      <View style={styles.timesWrapper}></View>
        <Text style={styles.times}>{props.data.viewed} times</Text>
      </View>
  </TouchableWithoutFeedback>
);

export default MemoryRow
