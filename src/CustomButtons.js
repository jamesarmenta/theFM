import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';

let deviceWidth = Dimensions.get('window').width;
let buttonSize = deviceWidth*.18;

export class CameraButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cameraButton: require('../resources/ui/camera_button.png')
    }
  }

  changeCameraButton() {
    this.setState({ cameraButton: require('../resources/ui/camera_button_pressed.png') });
    setTimeout(() => {
      this.setState({ cameraButton: require('../resources/ui/camera_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback  onPress={()=>{this.changeCameraButton(); Actions.capture()}}>
      <Image source={this.state.cameraButton} style={this.props.style} width={buttonSize*1.1} resizeMode={'contain'}/>
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
    this.setState({ listButton: require('../resources/ui/list_button_pressed.png') });
    setTimeout(() => {
      this.setState({ listButton: require('../resources/ui/list_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeListButton(); this.props.action()}}>
      <Image source={this.state.listButton} style={this.props.style} width={buttonSize} resizeMode={'contain'}/>
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
      <Image source={this.state.refreshButton} style={this.props.style} width={buttonSize} resizeMode={'contain'}/>
    </TouchableWithoutFeedback>
    )
  }
}

export class CaptureButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captureButton: require('../resources/ui/capture_button.png')
    }
  }

  changeCaptureButton() {
    if(this.props.disabled){return}
    this.setState({ captureButton: require('../resources/ui/capture_button_pressed.png') });
    setTimeout(() => {
      this.setState({ captureButton: require('../resources/ui/capture_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeCaptureButton(); this.props.onPress()}}>
      <Image source={this.state.captureButton} style={this.props.style} width={buttonSize*1.25} resizeMode={'contain'}/>
    </TouchableWithoutFeedback>
    )
  }
}

export class CancelButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cancelButton: require('../resources/ui/cancel_button.png')
    }
  }

  changeCancelButton() {
    if(this.props.disabled){return}
    this.setState({ cancelButton: require('../resources/ui/cancel_button_pressed.png') });
    setTimeout(() => {
      this.setState({ cancelButton: require('../resources/ui/cancel_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeCancelButton(); this.props.onPress()}}>
      <Image source={this.state.cancelButton} style={this.props.style} width={buttonSize} resizeMode={'contain'}/>
    </TouchableWithoutFeedback>
    )
  }
}

export class SwitchButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      switchButton: require('../resources/ui/switch_button.png')
    }
  }

  changeSwitchButton() {
    if(this.props.disabled){return}
    this.setState({ switchButton: require('../resources/ui/switch_button_pressed.png') });
    setTimeout(() => {
      this.setState({ switchButton: require('../resources/ui/switch_button.png') });
    }, 250)
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>{this.changeSwitchButton(); this.props.onPress()}}>
      <Image source={this.state.switchButton} style={this.props.style} width={buttonSize*1.5} resizeMode={'contain'}/>
    </TouchableWithoutFeedback>
    )
  }
}