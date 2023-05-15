import * as API from '../../../api/apiService';
import { showToastMessage } from "../toastNotification";

export const signUp = (requestBody) => (dispatch) => {
    API.signUp(requestBody)
    .then(result => {
            dispatch(showToastMessage(result.message, 'success'));
            history.push('/login')
        }, error => {
            dispatch(showToastMessage(error.response.data.message[0], 'error'));
        })
    }

export const login = (email, password) => (dispatch) => {
        API.login(email, password)
            .then(result => {
                // dispatch(showToastMessage("Logging In", "success"));
                localStorage.setItem('token', result.token)
                history.push('/');
            }, error => {
                dispatch(showToastMessage.setToastFail(error.message, 'error'));
            })
}
