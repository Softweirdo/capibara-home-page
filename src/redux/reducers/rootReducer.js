// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import accounts from "./accounts";
import toastNotification from "./toastNotification";
import giftCardReducer from './giftCard'
import checkOutReducer from "./checkOut";

const rootReducer = combineReducers({
    accounts,
    toastNotification,
    giftCardReducer,
    checkOutReducer
});

export default rootReducer;
