import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';
import { memoryViewed } from './UniversalFunctions.js'
import { Surface } from 'gl-react-native';
import HueRotate from './Shader.js';
const RNFS = require('react-native-fs');
const HOLES = require('./Holes.js');

//UI
import { CameraButton, ListButton, RefreshButton } from './CustomButtons.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const blankHole = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

class MemoryView extends Component {
  constructor(props) {
    super(props)

    memoryViewed(this.props.date, this.props.imagePath);

    this.state = {
      memoryDate: this.props.date,
      shaderImage: this.props.imagePath,
      shaderHole: HOLES[Math.round(Math.random() * HOLES.length)],
      shaderHole2: HOLES[Math.round(Math.random() * HOLES.length)],
      memoryViews: this.props.viewed
    }

    console.log(this.props.imagePath);
  }

  refreshMemory = () => {
    //prevent refresh until complete
    this.setState({ refreshDisabled: true });

    var oldPath = this.state.shaderImage;
    var newPath = this.state.shaderImage.replace(/\d{0,3}\.jpg/, (this.state.memoryViews + 1) + '.jpg');

    //capture frame, replace current image
    this.refs.currentMemory.captureFrame({ type: "jpg", format: "file", filePath: newPath })
      .then(uri => {
        //alternate case so as to force state update
        this.setState({
          shaderImage: newPath,
          shaderHole: HOLES[Math.round(Math.random() * (HOLES.length - 1))],
          shaderHole2: HOLES[Math.round(Math.random() * HOLES.length)],
          refreshDisabled: false,
          memoryViews: this.state.memoryViews + 1
        });
        memoryViewed(this.props.date, newPath);

        //delete old file
        RNFS.unlink(oldPath)
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch((err) => {
            console.log(err.message);
          });
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <Image style={{width: 400, height: 500}} source={{uri: this.state.shaderImage}}>
      <Surface width={400} height={500} ref={"currentMemory"}>
        <HueRotate image={{uri: this.state.shaderImage}} hole={this.state.shaderHole || blankHole} holetwo={this.state.shaderHole2 || blankHole}></HueRotate>
      </Surface>
      </Image>
      <Image style={{position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={require('./resources/ui/memory_view.png')}>
      </Image>



      <Text style={styles.text}>
      {/*
        {new Date(parseInt(this.props.date)).toLocaleTimeString("en-us", dateFormat)}
        Viewed {this.state.memoryViews} times
      */}
      </Text>
      <View style={{position: 'absolute', bottom: 75, alignItems: 'center', alignSelf: 'flex-start', padding: 12}}>
        {/*<Button
          disabled={this.state.refreshDisabled}
          onPress = {() => this.refreshMemory()}
          title = "Refresh?"
        />*/}
        <RefreshButton 
          disabled={this.state.refreshDisabled}
          onPress = {() => this.refreshMemory()}
          />
        <ListButton style={{marginLeft: 10, marginBottom: -20}} actionsObject={{type: ActionConst.POP_AND_REPLACE}}/>
        <CameraButton/>
      </View>
    </View>
    );
  }
}

export default MemoryView
