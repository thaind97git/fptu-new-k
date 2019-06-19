import userReducer from './UserState';
import toastReducer from './ToastState';
import menuReducer from './MenuState';
import { combineReducers } from 'redux';

export default combineReducers({
    ...userReducer,
    ...toastReducer,
    ...menuReducer
})