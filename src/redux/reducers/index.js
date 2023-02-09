import { combineReducers } from 'redux';

const INITIAL_STATE = {};

const indexReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ indexReducer });

export default rootReducer;
