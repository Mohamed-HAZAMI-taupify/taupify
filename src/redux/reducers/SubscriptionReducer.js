import {
    GET_SUBSCRIPTIONS,
} from "../../data/actionTypes";
const initialState = {
    subscriptionList: [],
};
const SubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptionList: action.payload,
            };
        default:
            return state;
    }
};
export default SubscriptionReducer;
