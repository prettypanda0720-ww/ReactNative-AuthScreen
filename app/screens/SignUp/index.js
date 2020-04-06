import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, Button, Image} from '@components';
import styles from './styles';
import firebaseSvc from '@services/FirebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      neighbourhood: '',
      loading: false,
      success: {
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        neighbourhood: true,
      },
    };
  }

  onSignUp() {
    const {navigation} = this.props;
    let {
      first_name,
      last_name,
      email,
      password,
      neighbourhood,
      success,
    } = this.state;

    let user = {
      name: first_name + last_name,
      email: email,
      password: password,
      avatar: Images.avata1,
    };

    if (
      first_name == '' ||
      last_name == '' ||
      email == '' ||
      password == '' ||
      neighbourhood == ''
    ) {
      this.setState({
        success: {
          ...success,
          first_name: first_name != '' ? true : false,
          last_name: last_name != '' ? true : false,
          email: email != '' ? true : false,
          password: password != '' ? true : false,
          neighbourhood: neighbourhood != '' ? true : false,
        },
      });
    } else {
      try {
        this.setState(
          {
            loading: true,
          },
          firebaseSvc.createAccount(user),
        );
      } catch ({message}) {
        console.log('create account failed. catch error:' + message);
      }
      this.setState({loading: false});
    }
  }

  render() {
    const {navigation} = this.props;
    let {
      loading,
      first_name,
      last_name,
      email,
      password,
      neighbourhood,
      success,
    } = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Sign Up"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <Image
              source={Images.logo_reverse}
              style={styles.logo}
              resizeMode="contain"
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 65}]}
              onChangeText={text => this.setState({first_name: text})}
              autoCorrect={false}
              placeholder="First Name"
              placeholderTextColor={
                success.first_name
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={first_name}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={text => this.setState({last_name: text})}
              autoCorrect={false}
              placeholder="Last Name"
              placeholderTextColor={
                success.last_name ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={last_name}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={text => this.setState({email: text})}
              autoCorrect={false}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={
                success.email ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={email}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={text => this.setState({password: text})}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                success.password ? BaseColor.grayColor : BaseColor.primaryColor
              }
              value={password}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={text => this.setState({neighbourhood: text})}
              autoCorrect={false}
              placeholder="Neighbourhood"
              placeholderTextColor={
                success.neighbourhood
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={neighbourhood}
            />
            <View style={{width: '100%'}}>
              <Button
                full
                style={{marginTop: 20}}
                loading={loading}
                onPress={() => this.onSignUp()}>
                Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
