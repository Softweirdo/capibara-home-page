import { request } from '../utility/apiService';
import {SERVER_URL} from '../config';

export function login(userName, password) {
  let requestBody ={
    userName,
    password
  }
  return request(`${SERVER_URL}/auth/login`,
  'post',
  {
    'Content-Type': 'application/json',
  },
  requestBody)
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    throw (error);
  });
}

export function signUp(requestBody) {
  return request(`${SERVER_URL}/auth/register`,
  'post',
  {
    'Content-Type': 'application/json',
  },
  requestBody)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function getCountryCode() {
  return request(`http://country.io/phone.json`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export const sendEmail = (requestBody) => {
  return request(`${SERVER_URL}/emailDetail`, 
  'post',
  {
    'Content-Type': 'application/json',
  },
  requestBody)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function getCategory() {
  return request(`${SERVER_URL}/category`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function getGiftCardList(currentPage, pageSize) {
  return request(`${SERVER_URL}/card?page=${currentPage}&sizePerPage=${pageSize}`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}
export function getGiftCardListByCategoryId(categoryId, currentPage, pageSize) {
  return request(`${SERVER_URL}/card?categoryId=${categoryId}&page=${currentPage}&sizePerPage=${pageSize}`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}
export function getGiftCardDetail(GiftCardId){
  return request(`${SERVER_URL}/card/${GiftCardId}`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function getAllPromoCode(currentPage, pageSize){
  return request(`${SERVER_URL}/promo-code/all?page=${currentPage}&sizePerPage=${pageSize}`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function checkPromoCode(promoCode, cardId) {
  return request(`${SERVER_URL}/promo-code?code=${promoCode}&cardId=${cardId}`, 
  'get',
  {
    'Content-Type': 'application/json',
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function contactus(requestBody) {
  return request(`${SERVER_URL}/emailDetail/contact`, 
  'post',
  {
    'Content-Type': 'application/json',
  },
  requestBody)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}

export function businessEnquiry(requestBody) {
  return request(`${SERVER_URL}/emailDetail/business`, 
  'post',
  {
    'Content-Type': 'application/json',
  },
  requestBody)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
}
