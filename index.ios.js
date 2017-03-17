import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  View,
  ListView,
  Image,
  Alert,
  Dimensions,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';
const RNFS = require('react-native-fs');

//UNIVERSAL FUNCTIONS
import { getAllMemories } from './UniversalFunctions.js';

//UI
import { CameraButton, ListButton } from './CustomButtons.js';
import MemoryRow from './MemoryRow';

//PAGES
import MemoryView from './MemoryView';
import Capture from './Capture';

//HOME PAGE
class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
      <StatusBar hidden={true} />
      <Image source={require('./resources/ui/default-568h@2x.png')} 
      style={{width: Dimensions.width, flex: 1, flexDirection: 'column', justifyContent: 'center',  padding:10, paddingTop:30}}  
      resizeMode={"cover"}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CameraButton style={{alignSelf: 'center'}}/>
          <ListButton style={{alignSelf: 'center'}}/>
      </View>
      </Image>
      </View>
    );
  }
}

//ALL MEMORIES
class Memories extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['placeholder']),
      localMemories: []
    }

    getAllMemories().then((data) => {
      this.setState({
        dataSource: ds.cloneWithRows(data),
        localMemories: data
      })
    }).catch((error) => { console.log('error', error); })
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
        <Scene key="memoryView"
          component={MemoryView}
        />
    </Router>
    );
  }
}

AppRegistry.registerComponent('theFM', () => theFM);
