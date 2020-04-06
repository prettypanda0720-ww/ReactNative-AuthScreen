import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {View, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Text, Animated, Easing, Alert} from 'react-native';
import {bindActionCreators} from 'redux';
import {SafeAreaView, Button, Image, Logo, Form, SignupSection, ButtonSubmit} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images} from '@config';
import * as Utils from '@utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class Walkthrough extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scrollEnabled: true,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      this.authentication();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }
  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  authentication() {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props.actions.authentication(true, response => {
          if (response.success) {
            this.props.navigation.navigate('Loading');
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      },
    );
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAuthAreaView} forceInset={{top: 'always'}}>
        
        <Logo />
        <Form />
        
        <View style={styles.containerLogin}>
          <Animated.View style={{width: changeWidth}}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._onPress}
              activeOpacity={1}>
              {this.state.isLoading ? (
                <Image source={Images.loading} style={styles.image} />
              ) : (
                <Text style={styles.textLogin}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <Animated.View style={[styles.circle, {transform: [{scale: changeScale}]}]}></Animated.View>
          </Animated.View>
        </View>
        
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.text}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.text}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
      // <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      //   <ScrollView
      //     style={styles.contain}
      //     scrollEnabled={this.state.scrollEnabled}
      //     onContentSizeChange={(contentWidth, contentHeight) =>
      //       this.setState({
      //         scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight),
      //       })
      //     }>
      //     <View style={styles.wrapper}>
      //       {/* Images Swiper */}
            
      //     </View>
      //     <View style={{width: '100%'}}>
      //       <Button
      //         full
      //         style={{
      //           backgroundColor: BaseColor.navyBlue,
      //           marginTop: 20,
      //         }}
      //         onPress={() => {
      //           this.authentication();
      //         }}>
      //         Login with Facebook
      //       </Button>
      //       <Button
      //         full
      //         style={{marginTop: 20}}
      //         loading={this.state.loading}
      //         onPress={() => navigation.navigate('SignIn')}>
      //         Sign In
      //       </Button>
      //       <View style={styles.contentActionBottom}>
      //         <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      //           <Text body1 grayColor>
      //             Haven’t registered yet?
      //           </Text>
      //         </TouchableOpacity>

      //         <TouchableOpacity /*onPress={() => this.authentication()}*/>
      //           <Text body1 MainPrimaryColor>
      //             Join Now
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </ScrollView>
      // </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Walkthrough);
