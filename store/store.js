import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const cp = typeof window !== 'undefined' ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const makeStore = (initialState) => {
    if (process.env.NODE_ENV === "development") {
        return createStore(rootReducer, initialState, cp(applyMiddleware(thunk)))
    }
    return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
export default makeStore;
