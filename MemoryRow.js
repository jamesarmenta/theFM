import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
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
  <TouchableWithoutFeedback onPress={()=>{props.data.viewed++;Actions.memoryView(props.data)}}>
  <View style={styles.container} >
      <Image source={{ uri: props.data.imagePath}} style={{width: 10, height: 10,}} />
      <Text style={styles.text}>
        {new Date(parseInt(props.data.date)).toLocaleTimeString("en-us", dateFormat)}
        {'\n'}
        Viewed {props.data.viewed} times
      </Text>
  </View>
  </TouchableWithoutFeedback>
);

export default MemoryRow
