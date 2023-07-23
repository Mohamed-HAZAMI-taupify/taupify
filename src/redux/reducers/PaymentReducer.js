import { PAYMENT } from "../../data/actionTypes";

const initialState = {
  paymentLink: "",
};
const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT:
      return {
        ...state,
        paymentLink: action.payload,
      };
    default:
      return state;
  }
};
export default PaymentReducer;
