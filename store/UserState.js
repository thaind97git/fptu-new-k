import axios from 'axios';
import Router from 'next/router';
import { URL_USER } from '../constant/UrlApi';
import * as storageConfig from '../config/storageConfig';
import * as Utils from '../utils/utils';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const checkHOC = () => dispatch => {
    // const token = storageConfig.getToken();
    // if (!token) {
    //     dispatch(login_fail());
    // } else {
    //     // const headers = {
    //     //     'x-access-token': token
    //     // };
    //     // axios.post(URL_USER.CHECK_LOGIN, null, { headers: headers })
    //     //     .then(resp => {
    //     //         dispatch(login_success())
    //     //     })
    //     //     .catch(err => {
    //     //         dispatch(login_fail())
    //     //     })

    // }
    axios.post(URL_USER.CHECK_LOGIN)
        .then(rs => {
            const resp = rs.data;
            console.log(resp)
            // !Utils.isEmptyObject(resp.data) ? 
            //     dispatch(login_success()) : dispatch(login_fail())
                dispatch(login_success())
        })
        .catch(err => {
            dispatch(login_fail())
        })
}
export const checkLogin = () => dispatch => {
    // const token = storageConfig.getToken();
    // if (!token) {
    //     dispatch(login_fail());
    // } else {
    //     // const headers = {
    //     //     'x-access-token': token
    //     // };
    //     // axios.post(URL_USER.CHECK_LOGIN, null, { headers: headers })
    //     //     .then(resp => {
    //     //         dispatch(login_success())
    //     //         Router.push('/dashboard');
    //     //     })
    //     //     .catch(err => {
    //     //         dispatch(login_fail())
    //     //     })
        
    // }
    axios.post(URL_USER.CHECK_LOGIN)
        .then(rs => {
            const resp = rs.data;
            // if (!Utils.isEmptyObject(resp.data)) {
            //     dispatch(login_success())
            //     Router.push('/dashboard');
            // }
            dispatch(login_success())
            Router.push('/dashboard');
        })
        .catch(err => {
            dispatch(login_fail())
        })
}

export const login_success = () => ({
    type: LOGIN_SUCCESS,
    payload: {
        data: "Login success !"
    }
})
const login_fail = () => ({
    type: LOGIN_FAIL,
    payload: {
        data: "Login fail !"
    }
})


export default {
    isLoggedIn(state = false, { type, payload }) {
        if (type === LOGIN_SUCCESS) {
            return true;
        }
        if (type === LOGIN_FAIL) {
            Router.push('/login')
            return false;
        }
        return state;
    }
}