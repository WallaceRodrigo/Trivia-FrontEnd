import { combineReducers } from 'redux';
import player from './loginReducers';

const rootReducer = combineReducers({ player });

export default rootReducer;
