export const SAVETOKEN = 'SAVETOKEN';
export const SAVE_INFOS = 'SAVE_INFOS';

export const saveToken = (token) => ({ type: SAVETOKEN, token });
export const saveInfos = (name, email) => ({ type: SAVE_INFOS, name, email });
