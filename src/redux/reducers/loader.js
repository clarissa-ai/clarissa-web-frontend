/* eslint-disable require-jsdoc */
import {SET_LOADER} from '../actionTypes';

const loader = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
    case SET_LOADER: {
        return action.payload;
    }
    default:
        return state;
    }
};

export default loader;
