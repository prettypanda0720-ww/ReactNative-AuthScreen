import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {UserInput,ButtonSubmit,SignupSection} from '@components';
import {BaseColor, BaseStyle, Images} from '@config';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={Images.username}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={Images.password}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={Images.eye_black} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    marginTop: 18,
    width: 25,
    height: 25,
    tintColor: 'rgba(255,255,255,0.9)',
  },
});
