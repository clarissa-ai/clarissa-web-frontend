import {combineReducers} from 'redux';
import profile from './profile';
import loader from './loader';

const rootReducer = combineReducers({profile, loader});

export default rootReducer;
