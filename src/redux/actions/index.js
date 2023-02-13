export const SAVETOKEN = 'SAVETOKEN';
export const SAVE_INFOS = 'SAVE_INFOS';
export const CALC_SCORE = 'CALC_SCORE';
export const SAVE_CORRECTS = 'SAVE_CORRECTS';

export const saveToken = (token) => ({ type: SAVETOKEN, token });
export const saveInfos = (name, email) => ({ type: SAVE_INFOS, name, email });
export const calcScore = (score) => ({ type: CALC_SCORE, score });
export const saveCorrects = () => ({ type: SAVE_CORRECTS });
