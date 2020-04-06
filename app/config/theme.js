import {StyleSheet} from 'react-native';
import {BaseColor} from './color';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20,
  },
  bodyMarginDefault: {
    marginHorizontal: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
  },
  safeAuthAreaView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BaseColor.loginBackgroundColor,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeGrayView: {
    // flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  boxWidthShadow: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 2,
  },
});
