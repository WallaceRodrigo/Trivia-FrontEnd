import { SAVETOKEN, SAVE_INFOS } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVETOKEN:
    return {
      ...state,
      token: action.token,
    };
  case SAVE_INFOS:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
