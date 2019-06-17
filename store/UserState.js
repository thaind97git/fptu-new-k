import axios from 'axios';
import Router from 'next/router';
import { URL_USER } from '../constant/UrlApi';
import * as Utils from '../utils/utils';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const checkHOC = () => dispatch => {
    axios.get(URL_USER.CHECK_LOGIN)
        .then(rs => {
            const resp = rs.data;
            !Utils.isEmptyObject(resp.data) ? 
                dispatch(login_success()) : dispatch(login_fail())
        })
        .catch(err => {
            dispatch(login_fail())
        })
}
export const checkLogin = () => dispatch => {
    axios.get(URL_USER.CHECK_LOGIN)
        .then(rs => {
            const resp = rs.data;
            if (!Utils.isEmptyObject(resp.data)) {
                dispatch(login_success())
                Router.push('/dashboard');
            }
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