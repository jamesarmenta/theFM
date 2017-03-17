import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

export class CameraButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cameraButton: require('./resources/ui/camera_button.png')
    }
  }

  changeCameraButton() {
    this.setState({ cameraButton: require('./resources/ui/camera_button_press.png') });
    setTimeout(() => {
      this.setState({ cameraButton: require('./resources/ui/camera_button.png') });
    }, 1000)
  }

  render() {
    return (
    <TouchableWithoutFeedback  onPress={()=>{this.changeCameraButton(); Actions.capture()}}>
      <Image source={this.state.cameraButton} style={this.props.style}/>
    </TouchableWithoutFeedback>
    )
  }
}

export class ListButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listButton: require('./resources/ui/list_button.png')
    }
  }

  changeListButton() {
    this.setState({ listButton: require('./resources/ui/list_button_press.png') });
    setTimeout(() => {
      this.setState({ listButton: require('./resources/ui/list_button.png') });
    }, 1000)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeListButton(); Actions.memories()}}>
      <Image source={this.state.listButton} style={this.props.style} />
    </TouchableWithoutFeedback>
    )
  }
}