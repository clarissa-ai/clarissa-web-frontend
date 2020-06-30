/* eslint-disable require-jsdoc */
import {SET_LOADER} from '../actionTypes';

const loaderReducer = (state = {}, action) => {
    switch (action.type) {
    case SET_LOADER: {
        return {
            ...state,
            loader: action.payload,
        };
    }
    default:
        return state;
    }
};

export default loaderReducer;
