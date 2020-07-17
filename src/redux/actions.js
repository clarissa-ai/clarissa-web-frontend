import {SET_PROFILE, SET_LOADER} from './actionTypes';

export const setProfile = (profile) => ({
    type: SET_PROFILE,
    payload: profile,
});

export const setLoader = (loader) => ({
    type: SET_LOADER,
    payload: loader,
});
