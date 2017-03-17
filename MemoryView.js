import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { memoryViewed } from './UniversalFunctions.js'
import { Surface } from 'gl-react-native';
import HueRotate from './Shader.js';
const RNFS = require('react-native-fs');
const HOLES = require('./Holes.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

    memoryViewed(this.props.date);

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
    //capture frame, replace current image
    this.refs.currentMemory.captureFrame({ type: "jpg", format: "file", filePath: this.state.shaderImage })
      .then(uri => {
          //alternate case so as to force state update
          var imagePath = this.state.shaderImage;
          imagePath = (imagePath == imagePath.toUpperCase()) ? imagePath.toLowerCase() : imagePath.toUpperCase();
          this.setState({
            shaderImage: imagePath || this.state.shaderImage ,
            shaderHole: HOLES[Math.round(Math.random() * (HOLES.length - 1))],
            shaderHole2: HOLES[Math.round(Math.random() * HOLES.length)],
            refreshDisabled: false,
            memoryViews: this.state.memoryViews + 1
          });

          memoryViewed(this.props.date);
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <Surface width={300} height={500} ref={"currentMemory"}>
        <HueRotate image={{uri: this.state.shaderImage}} hole={this.state.shaderHole || blankHole} holetwo={this.state.shaderHole2 || blankHole}></HueRotate>
      </Surface>

      <Text style={styles.text}>
        {new Date(parseInt(this.props.date)).toLocaleTimeString("en-us", dateFormat)}
        {'\n'}
        Viewed {this.state.memoryViews} times
      </Text>
      <Button 
          style={{color: '#f00'}}
          onPress={()=>Actions.memories()}
          title="Back"
          />
      <Button
        disabled={this.state.refreshDisabled}
        onPress = {() => this.refreshMemory()}
        title = "Refresh?"
      />
    </View>
    );
  }
}

export default MemoryView
