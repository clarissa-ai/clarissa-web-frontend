/* eslint-disable require-jsdoc */
import {SET_PROFILE} from '../actionTypes';

const profile = (state = {}, action) => {
    switch (action.type) {
    case SET_PROFILE: {
        return action.payload;
    }
    default:
        return state;
    }
};

export default profile;
