import Router from 'next/router';

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function redirectURL(url, option) {
    return Router.replace(url, '', option)
}