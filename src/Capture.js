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

import { CancelButton, CaptureButton, SwitchButton } from './CustomButtons.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    maxHeight: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    backgroundColor: '#f00'
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
        <Image source={require('../resources/ui/capture_back.png')} 
        style={{   width: Dimensions.get('window').width, 
                    height: Dimensions.get('window').width*.778,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
          <View 
          style={{ height: Dimensions.get('window').height*.1, 
                    width: Dimensions.get('window').width*.85, 
                    bottom: Dimensions.get('window').height*.1, 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
            <CancelButton style={{marginRight: Dimensions.get('window').width*.06}}onPress={()=>Actions.pop({refresh: {}})}/>
            <CaptureButton onPress={this.takePicture.bind(this)}/>
            <SwitchButton onPress={()=>{this.changeCameraType()}}/>
          </View>
        </Image>
      </View>
  );
}
}

export default Capture
