import {combineReducers} from 'redux';
import AuthReducer from './auth';
import BookingPayReducer from './bookingPay';

export default combineReducers({
  auth: AuthReducer,
  bookingPay: BookingPayReducer,
});
