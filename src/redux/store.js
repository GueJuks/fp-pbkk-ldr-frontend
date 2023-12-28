import { createStore, combineReducers, applyMiddleware } from 'redux';

import {thunk} from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

const finallReducer = combineReducers({
    rootReducer,
});

const initialState = {
    rootReducer: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    },
};
const middleware = [thunk]

const store = createStore(
    finallReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;