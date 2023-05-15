import * as API from '../../../api/apiService';
import { SET_CATEGORY_LIST, SET_GIFT_CARD_LIST, SET_GIFT_CARD_DETAIL } from '../types';

export const setCategoryList = (data) => {
    return {
        type: SET_CATEGORY_LIST,
        categoryList: data
    }
}

export const getCategory = () => (dispatch) => {
    API.getCategory()
    .then(result => {
        dispatch(setCategoryList(result.data))
    }, error => {
        console.error(error);
    })
}

export const setGiftCardList = (data) => {
    return {
        type: SET_GIFT_CARD_LIST,
        giftCardList: data
    }
}

export const getGiftCardList = (currentPage, pageSize) => (dispatch) => {
    API.getGiftCardList(currentPage, pageSize)
    .then(result => {
        dispatch(setGiftCardList(result.data))
    }, error => {
        console.error(error);
    })
}

export const getGiftCardListByCategoryId = (categoryId, currentPage, pageSize) => (dispatch) => {
    API.getGiftCardListByCategoryId(categoryId, currentPage, pageSize)
    .then(result => {
        dispatch(setGiftCardList(result.data))
    }, error => {
        console.error(error);
    })
}


export const setGiftCardDetail = (data) => {
    return {
        type: SET_GIFT_CARD_DETAIL,
        giftCardDetail: data  
    }
}
export const getGiftCardDetail = (giftCardId) => (dispatch) => {
    API.getGiftCardDetail(giftCardId)
    .then(result => {
        dispatch(setGiftCardDetail(result.data))
    }, error => {
        console.error(error);
    })
}

export const sendEmail = (requestBody, successCallBack) => (dispatch) => {
    API.sendEmail(requestBody)
    .then(result => {
        successCallBack && successCallBack(result)
    }, error => {
        console.error(error);
    })
}

