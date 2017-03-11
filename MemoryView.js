import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
const resolveAssetSource = require('resolveAssetSource');
import { Surface } from 'gl-react-native';
import HueRotate from './Shader.js';
const RNFS = require('react-native-fs');
const HOLES = require('./Holes.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

class MemoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memoryDate: this.props.date,
      memoryImage: this.props.imagePath,
      shaderHole: HOLES[Math.round(Math.random()*HOLES.length)],
      shaderOffset: parseFloat((Math.random() * 2) - 1),
    }
  }


  refreshMemory = () => {
    // this.refs.currentMemory.captureFrame({ type: "jpg", format: "file", filePath: this.state.memoryImage }).then(uri => {
    //refresh state with new image and shader holes
    this.setState({
      memoryImage: this.props.imagePath,
      shaderHole: HOLES[Math.round(Math.random()*HOLES.length)],
      shaderOffset: parseFloat((Math.random() * 2) - 1)
    })
  }

  render() {
    return (
      <View style={styles.container}>

      <Surface width={300} height={500}>
        <HueRotate image={{uri: this.props.imagePath}} hole={this.state.shaderHole}></HueRotate>
      </Surface>

      <Text style={styles.text}>
        {new Date(parseInt(this.props.date)).toLocaleTimeString("en-us", dateFormat)}
        {'\n'}
        Viewed {this.props.viewed} times
      </Text>
      <Button 
          style={{color: '#f00'}}
          onPress={()=>this.refreshMemory()}
          title="Refresh"
          />
      <Button 
          style={{color: '#f00'}}
          onPress={()=>Actions.memories()}
          title="Back"
          />
    </View>
    );
  }
}

export default MemoryView
