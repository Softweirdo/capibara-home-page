// ** ThemeConfig Import
import { SET_PROMO_CODE_DETAIL, SET_ITEM_TO_CART } from "../../actions/types";


const initialState = {
    promoCodeDetail: "",
    cartItem: '',
};
const checkOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROMO_CODE_DETAIL:
            return { ...state, 
                promoCodeDetail: action.promoCodeDetail
            };
        case SET_ITEM_TO_CART:
            return {...state, 
            cartItem: action.cartItem,
        };
        default:
            return state;
    }
};

export default checkOutReducer;
