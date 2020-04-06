import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {BaseColor, BaseStyle, Images} from '@config';
import {Image} from '@components';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.logo} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250, 
    height: 40,
    resizeMode: "stretch"
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});
