import { SAVETOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVETOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default loginReducer;
