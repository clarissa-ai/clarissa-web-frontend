import {combineReducers} from 'redux';
import profileReducer from './profile';
import loaderReducer from './loader';

export default combineReducers({profileReducer, loaderReducer});
