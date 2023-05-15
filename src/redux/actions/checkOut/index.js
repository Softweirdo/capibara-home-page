import { Paper } from "@mui/material";
import * as API  from "../../../api/apiService";
import { showToastMessage } from "../toastNotification";
import { SET_PROMO_CODE_DETAIL, SET_ITEM_TO_CART } from "../types";

export const setItemToCart = (data) => {
    return {
        type: SET_ITEM_TO_CART,
        cartItem: data
    }
}

const addToCartItem = (requestBody) => (dispatch) => {
    
}

export const setPromoCodeDetail = (data) => {
    return {
        type: SET_PROMO_CODE_DETAIL,
        promoCodeDetail: data
    }
}

export const getAllPromoCode = (currentPage, pageSize) => (dispatch) => {
    API.getAllPromoCode(currentPage, pageSize)
    .then(result => {
        if(result.data){
            dispatch(setPromoCodeDetail(result.data))
        }
    }, error => {
        dispatch(showToastMessage(error.massage, error))
    })
}

const checkPromoCode = (promoCode, cardId, successCallBack) => (dispatch) => {
    API.checkPromoCode(promoCode, cardId)
    .then(result => {
        successCallBack && successCallBack(result.data)
    }, error => {
        dispatch(showToastMessage(error.massage, error))
    })
}