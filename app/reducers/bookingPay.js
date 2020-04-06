import * as actionTypes from '@actions/actionTypes';
const initialState = {
  bookingPayMethod: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.BOOKING_PAY_METHOD:
      return {
        ...state,
        bookingPayMethod: action.data.bookingPayMethod,
      };
    default:
      return state;
  }
};
