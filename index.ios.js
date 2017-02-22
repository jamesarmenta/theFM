import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Button, TouchableHighlight, View, Alert, Dimensions } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Camera from 'react-native-camera';
var RNFS = require('react-native-fs');


//HOME
class Home extends Component {
  render() {
    return (
      <View style={{padding:10, paddingTop:30}}>
      <Text>MAIN MENU HERE?</Text>
      <Button 
      style={{color: '#f00'}}
      onPress={()=>Actions.memories()}
      title="View Memories"
      />
      <Button 
      style={{color: '#f00'}}
      onPress={()=>{console.log('CLICKED TO CAPTURE');Actions.capture()}}
      title="Capture Memory"
      />
      </View>
    );
  }
}


//CAPTURE
class Capture extends Component {
  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log('TOOK A PHOTO:');
        console.log(data);
        // data.path to get JPG path 
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
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}


//ALL MEMORIES
class Memories extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  render() {
    return (
      <View style={{padding:10, paddingTop:30}}>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
        <Button 
        style={{color: '#f00'}}
        onPress={()=>Actions.capture()}
        title="Capture Memory"
        />
      </View>
    );
  }
}


//DEFAULT RENDER
export default class theFM extends Component {
  //constructor
  constructor(props) {
    super(props);
  }

  //render
  render() {
    return (
      <Router hideNavBar={true}>
        <Scene key="home"
          component={Home}
          initial
        />
        <Scene key="capture"
          component={Capture}
        />
        <Scene key="memories"
          component={Memories}
        />
    </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
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

AppRegistry.registerComponent('theFM', () => theFM);
