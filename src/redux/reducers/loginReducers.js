import { CALC_SCORE, SAVETOKEN, SAVE_CORRECTS, SAVE_INFOS } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
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
  case CALC_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case SAVE_CORRECTS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default loginReducer;
