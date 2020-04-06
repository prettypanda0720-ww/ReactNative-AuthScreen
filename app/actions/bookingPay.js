import * as actionTypes from './actionTypes';

const BookingPayMethod = data => {
  return {
    type: actionTypes.BOOKING_PAY_METHOD,
    data,
  };
};

export const selectBookingPayMethod = payMethod => dispatch => {
  let data = {
    bookingPayMethod: payMethod,
  };
  dispatch(BookingPayMethod(data));
};
