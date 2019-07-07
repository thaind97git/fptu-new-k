import axios from 'axios';
import { REQUEST_OPTION_DEFAULT } from './options';
export const requestAPI = ({ method = 'GET', url = '', data = {}, headers = {}, responseType = 'json' }) => {
    if (url.length === 0) {
        throw new Error('URL is require');
    }
    const opt = {
        method: method,
        url: url,
        data: data,
        headers: headers,
        responseType: responseType
    }
    return axios(Object.assign(REQUEST_OPTION_DEFAULT, opt))
}