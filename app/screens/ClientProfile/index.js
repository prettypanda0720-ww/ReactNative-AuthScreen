import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  FlatList,
  Switch,
  TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag, HotelItem} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import { UserData, HotelData } from "@data";
import * as Utils from "@utils";
import styles from "./styles";

export default class ClientProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      index: 0,
      routes: [
        { key: "appointments", title: "Appointments" },
        { key: "products", title: "Products" },
        { key: "invoices", title: "Invoices" }
      ],
      userData: UserData[0]
    };
  }

  _handleIndexChange = index =>
    this.setState({
      index
    });

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({ route, focused, color }) => (
        <View
          style={{
            flex: 1,
            width: Utils.getWidthDevice() / 3,
            alignItems: "center"
          }}
        >
          <Text headline bold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "appointments":
        return (
          <AppointmentsTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case "products":
        return (
          <ProductsTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
      case "invoices":
        return (
          <InvoicesTab jumpTo={jumpTo} navigation={this.props.navigation} />
        );
    }
  };

  render() {
    const { navigation } = this.props;
    const { userData } = this.state;
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.5],
      extrapolate: "clamp"
    });
    const imageTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [-10, 50],
      extrapolate: "clamp"
    });
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Client Profile"
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={BaseColor.black}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          scrollEventThrottle={8}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: this.state.scrollY }
              }
            }
          ])}
        >
          <View style={styles.containField}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Animated.Image
                source={Images.profile2}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  position: "absolute",
                  alignSelf: "center",
                  bottom: 20,
                  transform: [
                    {
                      scale: imageScale
                    },
                    {
                      translateY: imageTranslateY
                    }
                  ]
                }}
              />
              <Text headline semibold numberOfLines={1}>
                {userData.name}
              </Text>
            </View>
          </View>
          <View style={styles.detailInfo}>
            <Text headline bold numberOfLines={1}>
                Email
            </Text>   
            <Text headline semibold numberOfLines={1}>
                riverstar1992@gmail.com
            </Text>   
          </View>
          <View style={styles.detailInfo}>
            <Text headline bold numberOfLines={1}>
                Gender
            </Text>   
            <Text headline semibold numberOfLines={1}>
                Male
            </Text>   
          </View>
          <View style={styles.detailInfo}>
            <Text headline bold numberOfLines={1}>
                Marketing Notification
            </Text>   
            <Text headline semibold numberOfLines={1}>
                Receiving your marketing emails and reminders
            </Text>   
          </View>
          <View style={{flexDirection:'row', marginTop: 10, marginBotton: 10}}>
            <View style={{flexDirection:'column', flex: 1, alignItems: 'center'}}>
                <Text headline semibold numberOfLines={1}>
                    SGD 0
                </Text>
                <Text headline semibold numberOfLines={1}>
                    Total Sales
                </Text>
            </View>  
            <View style={{flexDirection:'column', flex: 1, alignItems: 'center'}}>
                <Text headline semibold numberOfLines={1}>
                    SGD 0
                </Text>
                <Text headline semibold numberOfLines={1}>
                    Total Sales
                </Text>
            </View>
          </View>
          <TabView
            lazy
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class AppointmentsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      hotels: HotelData,
      appointments: [
        {
          date: 'Mar 19',  
          title: "Gel Express Mani",
          summary: "1h 30min with Judy",
          starttime: "Fri 11:00",
          totalprice: "SGD 0",
        },
        {
          date: 'Mar 19',  
          title: "Gel Express Mani",
          summary: "1h 30min with Judy",
          starttime: "Fri 11:00",
          totalprice: "SGD 0",
        },
       ]
    };
  }

  render() {
    return (
      <View style={{ padding: 20 }}>
        {this.state.appointments.map((item, index) => {
          return (
            <View style={{flexDirection: 'column', borderColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Text caption1 semibold>
                        {item.date}
                    </Text>
                    <Text caption1 semibold>
                        &nbsp;&nbsp;{item.starttime}
                    </Text>
                    <Text caption1 bold style={{color:'green'}}>
                        &nbsp;&nbsp;STARTED
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between',paddingRight: 40}}>
                    <Text overline semibold>
                        {item.summary}
                    </Text>
                    <Text overline semibold>
                        {item.totalprice}
                    </Text>
                    <Icon
                        name="angle-right"
                        size={18}
                        color={BaseColor.primaryColor}
                        style={{ position: 'absolute', right: 0 }}
                    />
                </View>   
            </View>
            
                
            
          );
        })}
      </View>
    );
  }
}

class ProductsTab extends Component {
  constructor(props) {
    super();
    this.state = {
      reminders: false
    };
  }

  toggleSwitch = value => {
    this.setState({ reminders: value });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ padding: 20 }}>
        
      </View>
    );
  }
}
class InvoicesTab extends Component {
  render() {
    return <View style={{ marginTop: 20 }} />;
  }
}
