import { SET_CATEGORY_LIST, SET_GIFT_CARD_DETAIL, SET_GIFT_CARD_LIST } from "../../actions/types";

const initialState = {
    categoryList: "",
    giftCardList: "",
    giftCardDetail: ""
};
const giftCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY_LIST:
            return { 
                    ...state, 
                    categoryList: action.categoryList 
                };
        case SET_GIFT_CARD_LIST:
            return { 
                    ...state, 
                    giftCardList: action.giftCardList 
                };
        case SET_GIFT_CARD_DETAIL:
            return { 
                    ...state, 
                    giftCardDetail: action.giftCardDetail 
                };
        default:
            return state;
    }
};

export default giftCardReducer;