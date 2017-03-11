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
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';
const RNFS = require('react-native-fs');

//UNIVERSAL FUNCTIONS
import { getAllMemories } from './UniversalFunctions.js'

//PAGES
import MemoryRow from './MemoryRow';
import MemoryView from './MemoryView';
import Capture from './Capture';

//HOME PAGE
class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Image source={require('./resources/ui/home_back@2x.jpg')} style={{flex: 1}}>
        <View style={{padding:10, paddingTop:30}}>
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
      </Image>
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
    }).catch((error) => { console.log('error',error); })
  }

  componentDidMount(){
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
          type={ActionConst.RESET}
        />
        <Scene key="memoryView"
          component={MemoryView}
        />
    </Router>
    );
  }
}

AppRegistry.registerComponent('theFM', () => theFM);
