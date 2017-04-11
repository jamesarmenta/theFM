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
  AsyncStorage,
  StatusBar
} from 'react-native';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
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
  constructor(props) {
    super(props);

    this.state = { cameraType: Camera.constants.Type.front }
    // Camera.checkDeviceAuthorizationStatus()
    //   .then((authorized) => {
    //     if (!authorized) Alert.alert('Not Authorized');
    //   })
}

changeCameraType() {
  if (this.state.cameraType == Camera.constants.Type.front) {
    this.setState({ cameraType: Camera.constants.Type.back })
  } else {
    this.setState({ cameraType: Camera.constants.Type.front })
  }
}

takePicture() {
  this.camera.capture()
    .then((data) => {
      ImageEditor.cropImage(data.path, { offset: { x: 0, y: 0 }, size: { width: Dimensions.get('window').width, height: Dimensions.get('window').width } },
        (result) => {
          croppedImage = ImageStore.getBase64ForTag(result, (imageInBase64) => {
            RNFS.writeFile(data.path, imageInBase64, 'base64')
              .then(() => {
                createMemory(data.path).then((memoryObject) => {
                  Actions.memories({ type: ActionConst.RESET });
                  memoryObject.type = ActionConst.RESET;
                  Actions.memoryView(memoryObject);
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
        <StatusBar hidden={true} />
        <Camera
          ref={(cam) => {
              this.camera = cam;
            }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.medium}
          type={this.state.cameraType}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
        <Text onPress={()=>{this.changeCameraType()}}>[SWITCH]{'\n'}</Text>
        <Text onPress={()=>Actions.pop({refresh: {}})}>[CANCEL]</Text>
      </View>
  );
}
}

export default Capture
