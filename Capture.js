import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  View,
  ListView,
  Image,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import { createMemory } from './UniversalFunctions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

class Capture extends Component {
  takePicture() {
    this.camera.capture()
      .then((data) => {
        createMemory(data.path).then((memoryObject) => {
          Actions.memoryView(memoryObject)
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.low}
          type={Camera.constants.Type.front}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text onPress={()=>Actions.pop({refresh: {}})}>[CANCEL]</Text>
        </Camera>
      </View>
    );
  }
}

export default Capture
