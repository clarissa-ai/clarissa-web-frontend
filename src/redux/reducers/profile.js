/* eslint-disable require-jsdoc */
import {SET_PROFILE} from '../actionTypes';

const profileReducer = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
    case SET_PROFILE: {
        return {
            ...state,
            profile: action.payload,
        };
    }
    default:
        return state;
    }
};

export default profileReducer;
