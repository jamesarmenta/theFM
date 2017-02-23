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
var RNFS = require('react-native-fs');

//UNIVERSAL FUNCTIONS
async function createMemory(imagePath) {
  let date = new Date().getTime().toString();
  let memoryObject = { date: date, imagePath: imagePath, viewed: 0 };
  let memoryValue = JSON.stringify(memoryObject)

  try {
    await AsyncStorage.setItem('memory:' + date, memoryValue);
  } catch (error) {
    console.log('ERROR OCURRED CREATING MEMORY');
  }
}

async function getMemory(key) {
  try {
    let memoryValue = await AsyncStorage.getItem(key);
    memoryValue = JSON.parse(memoryValue);
    return memoryValue;
  } catch (error) {
    console.log('ERROR OCURRED GETTING MEMORY');
  }
}

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
      onPress={()=>{Actions.capture()}}
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
        createMemory(data.path).then(() => {
          Actions.memories();
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
          captureQuality={Camera.constants.CaptureQuality.medium}
          type={Camera.constants.Type.front}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text onPress={()=>Actions.pop()}>[CANCEL]</Text>
        </Camera>
      </View>
    );
  }
}

async function getAllMemories() {
  let memoryKeys = []
  let memoryValues = []
  try {
    //GET ALL KEYS
    let allKeys = await AsyncStorage.getAllKeys();
    for (var i = 0; i < allKeys.length; i++) {
      //GET MEMORY KEYS
      if (allKeys[i].indexOf('memory') > -1) {
        memoryKeys.push(allKeys[i])
      }
    }
    //GET VALUES OF MEMORIES
    for (var i = 0; i < memoryKeys.length; i++) {
      memoryValues[i] = await getMemory(memoryKeys[i])
    }
    return memoryValues
  } catch (error) {}
}

import MemoryRow from './MemoryRow';

//ALL MEMORIES
class Memories extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['placeholder'])
    }

    getAllMemories().then((data) => {
        this.setState({
          dataSource: ds.cloneWithRows(data)
        })
      })
      .catch((error) => { console.log(error); })
  }

  render() {
    return (
      <View style={{padding:10, paddingTop:30}}>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <MemoryRow {...{data}}/>}
        enableEmptySections={true}
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

//MEMORY VIEW
class Memory extends Component {
  render() {
    return (
      <View style={{padding:10, paddingTop:30}}>
      <Text>DETAILED MEMORY VIEW</Text>
      <Button 
      style={{color: '#f00'}}
      onPress={()=>Actions.memories()}
      title="View Memories"
      />
      <Button 
      style={{color: '#f00'}}
      onPress={()=>{Actions.capture()}}
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
