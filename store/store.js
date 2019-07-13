import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as apiMiddleware } from 'redux-api-call';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const cp = typeof window !== 'undefined' ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const makeStore = (initialState) => {

    const middlewares = applyMiddleware(
        apiMiddleware,
        thunk
      );

    if (process.env.NODE_ENV === "development") {
        return createStore(rootReducer, initialState, cp(middlewares))
    }
    return createStore(rootReducer, initialState, middlewares)
}
export default makeStore;
