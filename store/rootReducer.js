import userReducer from './UserState';
import { combineReducers } from 'redux';

export default combineReducers({
    ...userReducer,
})