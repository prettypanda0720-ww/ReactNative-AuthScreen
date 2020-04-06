import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthActions} from '@actions';
import {bindActionCreators} from 'redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {BaseStyle, BaseColor, Images} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, Image} from '@components';
import styles from './styles';
import firebaseSvc from '@services/FirebaseSvc';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      loading: false,
      success: {
        id: true,
        password: true,
      },
      fireBaseLogin: false,
    };
  }

  onLogin() {
    const {id, password, success} = this.state;

    if (id == '' || password == '') {
      this.setState({
        success: {
          ...success,
          id: false,
          password: false,
        },
      });
    } else {
      const user = {
        email: this.state.id,
        password: this.state.password,
      };
      this.setState({
        loading: true,
      });
      firebaseSvc.login(
        user,
        this.loginFireBaseSuccess,
        this.loginFireBaseFailed,
      );
    }
  };

  loginFireBaseSuccess = () => {
    const {navigation} = this.props;
    this.props.actions.authentication(true, response => {
      if (response.success) {
        navigation.navigate('Loading');
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  loginFireBaseFailed() {
    Alert.alert('failed');
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
        <Header
          title="Sign In"
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
              source={Images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 65}]}
              onChangeText={text => this.setState({id: text})}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    id: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, {marginTop: 10}]}
              onChangeText={text => this.setState({password: text})}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    password: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={{width: '100%'}}>
              <Button
                full
                loading={this.state.loading}
                style={{marginTop: 20}}
                onPress={() => {
                  this.onLogin();
                }}>
                Sign In
              </Button>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text body1 grayColor style={{marginTop: 25}}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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
)(SignIn);
