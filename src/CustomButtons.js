import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';

export class CameraButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cameraButton: require('../resources/ui/camera_button.png')
    }
  }

  changeCameraButton() {
    this.setState({ cameraButton: require('../resources/ui/camera_button_press.png') });
    setTimeout(() => {
      this.setState({ cameraButton: require('../resources/ui/camera_button.png') });
    }, 250)
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
      listButton: require('../resources/ui/list_button.png')
    }
  }

  changeListButton() {
    this.setState({ listButton: require('../resources/ui/list_button_press.png') });
    setTimeout(() => {
      this.setState({ listButton: require('../resources/ui/list_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeListButton(); this.props.action()}}>
      <Image source={this.state.listButton} style={this.props.style} />
    </TouchableWithoutFeedback>
    )
  }
}

export class RefreshButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshButton: require('../resources/ui/refresh_button.png')
    }
  }

  changeRefreshButton() {
    if(this.props.disabled){return}
    this.setState({ refreshButton: require('../resources/ui/refresh_button_pressed.png') });
    setTimeout(() => {
      this.setState({ refreshButton: require('../resources/ui/refresh_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeRefreshButton(); this.props.onPress()}}>
      <Image source={this.state.refreshButton} style={this.props.style} />
    </TouchableWithoutFeedback>
    )
  }
}