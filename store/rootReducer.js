import userReducer from './UserState';
import menuReducer from './MenuState';
import { combineReducers } from 'redux';

export default combineReducers({
    ...userReducer,
    ...menuReducer
})