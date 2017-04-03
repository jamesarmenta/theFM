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
  ImageEditor,
  ImageStore,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import { createMemory } from './UniversalFunctions.js';
const RNFS = require('react-native-fs');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    maxHeight: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    fontSize: 36,
  }
});

class Capture extends Component {
  takePicture() {
    this.camera.capture()
      .then((data) => {
        ImageEditor.cropImage(data.path, { offset: { x: 0, y: 0 }, size: { width: Dimensions.get('window').width, height: Dimensions.get('window').width } },
          (result) => {
            croppedImage = ImageStore.getBase64ForTag(result, (imageInBase64) => {
              RNFS.writeFile(data.path, imageInBase64, 'base64')
                .then(() => {
                  createMemory(data.path).then((memoryObject) => {
                    Actions.memoryView(memoryObject)
                  })
                })
            }, (error) => { console.log(error); })
          },
          (error) => { console.log(error); })
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
          captureQuality={Camera.constants.CaptureQuality.medium}
          type={Camera.constants.Type.front}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
          <Text onPress={()=>Actions.pop({refresh: {}})}>[CANCEL]</Text>
      </View>
    );
  }
}

export default Capture
