import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const cp = typeof window !== 'undefined' ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const makeStore = (initialState) => {
    return createStore(rootReducer, initialState, cp(applyMiddleware(thunk)))
}
export default makeStore;
