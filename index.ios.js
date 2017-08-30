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
import { getAllMemories } from './src/UniversalFunctions.js';

//UI
import { CameraButton, ListButton } from './src/CustomButtons.js';
import MemoryRow from './src/MemoryRow';

//PAGES
import MemoryView from './src/MemoryView';
import Capture from './src/Capture';

console.disableYellowBox = true;

//HOME PAGE
class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0)'}}>
        <StatusBar hidden={true} />
        <Image source={require('./resources/ui/default-568h.png')} 
        style={{width: Dimensions.width, flex: 1, flexDirection: 'column', justifyContent: 'flex-end',  padding:10, paddingTop:30}}  
        resizeMode={"cover"}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: Dimensions.get('window').height*.22}}>
            <CameraButton style={{alignSelf: 'center', marginLeft: Dimensions.get('window').width*.02, }}/>
            <ListButton style={{alignSelf: 'center'}} action={()=>{Actions.memories({type: ActionConst.RESET})}}/>
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
      //sort newest to oldest
      data = data.sort((a, b) => {
        if (a.date > b.date) {
          return -1
        }
        if (a.date < b.date) {
          return 1
        }
        return 0
      });

      this.setState({
        dataSource: ds.cloneWithRows(data),
        localMemories: data
      })
    }).catch((error) => { console.log('error', error); })
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StatusBar hidden={true} />
        
        <Image source={require('./resources/ui/list_header.png')} 
        // height for this image is 'hacky' 
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*.3515, zIndex: 999}}
        resizeMode={'contain'}
        />
        <TouchableWithoutFeedback onPress={()=>{Actions.home({type: ActionConst.RESET })}}>
        <View style={{position: 'absolute', width: Dimensions.get('window').width*.2, height: Dimensions.get('window').width*.2, zIndex: 999 }}/>
        </TouchableWithoutFeedback>

        <View style={{height: Dimensions.get('window').height*.67, borderBottomWidth: 2, borderColor: '#B6B5B5'}}> 
         <ListView
          dataSource={this.state.dataSource}
          renderRow={(data,sectionID,rowID) => <MemoryRow {...{data,rowID}}/>}
          enableEmptySections={true}
          style={{marginTop: Dimensions.get('window').height*-.05, paddingTop: 8, zIndex: 0,}}
        />
        </View>
        <Image source={require('./resources/ui/itemlistfooter.png')} style={{width: Dimensions.get('window').width}} />
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
